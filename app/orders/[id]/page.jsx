'use client'
import React, { use } from 'react'
import { useState, useEffect, useContext } from "react";
import LocationPicker from "/components/LocationPicker";
import Link from "next/link";

import { useCounterStore } from '/store/useCounterStore'
import { useUtilsStore } from "/store/useUtilsStore";
import { useAuthStore } from "/store/authStore";
import Spinner from "/components/Spinner";
import InvoiceWithPDF from "/components/InvoiceWithPDF";
import Tabs from "/components/Tabs";
import Tab from "/components/Tab";
import Trackings from "/components/shop-elements/Trackings";
import OrderPayments from "/components/shop-elements/OrderPayments";
import OrderSubscription from "/components/shop-elements/OrderSubscription";
import OrderUpdate from "/components/shop-elements/OrderUpdate";
import OrderDelivery from "/components/shop-elements/OrderDelivery";
import { IconRss, IconTruckDelivery, IconRouteSquare, IconFileDollar, IconTrash, IconTrolley, IconStar, IconClockPause, IconExclamationCircle, IconRosetteDiscountCheck, IconX } from "@tabler/icons-react";


const page = ({ params }) => {
  const { id } = use(params)
  const { wrapCurrency } = useUtilsStore()
  const token = useAuthStore((state) => state.token);
  // const token = localStorage.getItem("token");

  if (!token) {

    return (
      <div className='p-10 text-center text-red-400'>You are not authorized to access this page, Plesae login to see your order details.</div>
    )
  }


  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const { appData, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX } = useCounterStore()


  var [orderData, setorderData] = useState(null);
  var [subscriptionData, setsubscriptionData] = useState(null);
  var [deliveryData, setdeliveryData] = useState(null);
  var [lineItems, setlineItems] = useState(null);
  var [loading, setloading] = useState(false);
  var [invoiceData, setinvoiceData] = useState(null);




  function get_order() {


    if (!token) {
      return null;
    }

    setloading(true)


    var postData = {
      id: id,
    };
    postData = JSON.stringify(postData);

    fetch(serverUrl + "wp-json/promptshub/v2/get_order", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: postData,
    })
      .then((response) => {

        if (!response.ok) {
          setloading(false)

          throw new Error('Token validation failed');
        }

        if (response.ok && response.status < 400) {
          response.json().then((res) => {





            var order = res?.order;
            // var downloads = res?.downloads;
            // var license = res?.license;
            var subscription = res?.subscription;
            var delivery = res?.delivery;
            var line_items = res?.line_items;




            setorderData(order)
            // setdownloadsData(downloads)
            // setlicenseData(license)
            setsubscriptionData(subscription)
            setdeliveryData(delivery)
            setlineItems(line_items)





            setTimeout(() => {
              setloading(false)

            }, 500);
          });
        }
      })
      .catch((_error) => {
        //this.saveAsStatus = 'error';
        // handle the error
      });

  }





  // useEffect(() => {
  // 	get_order();
  // }, []);

  useEffect(() => {
    get_order();
  }, [id]);
  useEffect(() => {

    var items = []

    lineItems?.map(item => {

      items.push({ id: item.id, desc: item.title, qty: item.quantity, price: item.price })

    })


    var data = {
      from: {
        name: "KidoBazar.com",
        address: "New Shalbon, House 145 Road 01",
        city: "Rangpur",
      },
      to: {
        name: orderData?.billing_name,
        address: orderData?.billing_address,
        city: orderData?.city,
        phone: orderData?.billing_phone,
      },
      items: items,
      taxPercent: 10,
      payment_method: orderData?.payment_method,
      payment_status: orderData?.payment_status,
      total: orderData?.total_amount,
      discount: orderData?.discount_amount,
      shipping: orderData?.shipping_amount,
      subtotal: orderData?.subtotal_amount,
      taxPercent: 10,
      invoiceNumber: orderData?.id,
      date: orderData?.created_at,
    }



    setinvoiceData(data)

  }, [orderData]);





  function formatDate(dateInput) {

    // 

    var format = "d/m/Y";
    dateInput = dateInput == undefined ? '' : dateInput;
    // Ensure date is in a proper format for parsing
    const dateObj = new Date(dateInput.replace(" ", "T"));

    if (isNaN(dateObj)) {
      throw new Error("Invalid date format");
    }

    // Extract date components
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = dateObj.getFullYear();

    // Replace format placeholders with actual values
    //return ;

    return (
      <>
        {format.replace("d", day).replace("m", month).replace("Y", year)}
      </>

    );

  }





  const requiredRoles = ["administrator", "rider", ""];
  const hasAccess = requiredRoles.some(role => userDataX?.roles?.includes(role));





  return (
    <div>




      <div className="p-5 grid grid-cols-1 gap-5 w-full xl:w-[900px] mx-auto pb-60">






        {loading && (

          <div className='flex justify-center '>

            <Spinner />

          </div>

        )}

        {(!loading && orderData) && (

          <Tabs activeTab={0}
            orientation="verical"
            activeClass="active-tab "
            tabPanelClass=""
            navsItemClass="bg-[#ffcbb3] p-3 px-4 rounded-sm flex gap-2 items-center text-gray-600"
            navsItemActiveClass="!bg-[#783009] !text-white"

            navsWrapperClass="gap-2 lg:w-50 "
            wrapperClass="gap-4"
            onSelect={(tabName) => { }}
            tabs={[
              { label: "Invoice", icon: <IconFileDollar size={18} /> },
              { label: "Order", icon: <IconFileDollar size={18} /> },
              // { label: "Payments", icon: <IconFileDollar size={18} /> },
              { label: "Subscription", icon: <IconRss size={18} /> },
              { label: "Delivery", icon: <IconTruckDelivery size={18} /> },
              { label: "Trackings", icon: <IconRouteSquare size={18} /> },


            ]}>
            <Tab index={0}>
              <InvoiceWithPDF invoice={invoiceData} />

            </Tab>
            <Tab index={1}>


              <OrderUpdate order_id={id} />


            </Tab>
            {/* <Tab index={2}>

              <OrderPayments order_id={id} />
            </Tab> */}

            <Tab index={2}>



              <OrderSubscription subscriptionId={subscriptionData?.id} />






            </Tab>
            <Tab index={3}>



              {deliveryData && (
                <OrderDelivery delivery_id={deliveryData?.id} delivery_location={orderData?.delivery_location} order_id={id} userid={orderData?.userid} />

              )}



            </Tab>

            <Tab index={4}>



              {deliveryData?.id && (
                <Trackings deliveryData={deliveryData} delivery_id={deliveryData?.id} order_id={id} />
              )}
              {!deliveryData?.id && (
                <div className="bg-white shadow-sm  p-5 rounded-sm">
                  No trackings yet, Please wait for rider response.
                </div>)}





            </Tab>



          </Tabs>

        )}














        {/* {JSON.stringify(subscriptionData)} */}





        {/* <div className="hidden">

          <h3 className="text-xl my-5">{("License")} </h3>


          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center">
            <div className=" px-5 py-2 w-40 font-bold">{("License Key")}</div>
            <div className=""> {licenseData?.license_key}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{("Activation Limit")}</div>

            <div className=""> {licenseData?.activation_limit}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{("Instances Count")}</div>

            <div className=""> {licenseData?.instances_count}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{("Test Mode")}</div>

            <div className=""> {licenseData?.test_mode}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{("Status")}</div>

            <div className=""> {licenseData?.status}</div>
          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{("User Email")}</div>

            <div className=""> {licenseData?.user_email}</div>
          </div>


          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold" >{("Created at")}</div>

            <div className=""> {licenseData?.created_at}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{("Expires at")}</div>

            <div className=""> {licenseData?.expires_at}</div>
          </div>







        </div> */}
      </div>

    </div>
  )
}

export default page