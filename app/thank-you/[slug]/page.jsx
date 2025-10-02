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
  const { slug } = use(params)
  const { wrapCurrency } = useUtilsStore()
  const token = useAuthStore((state) => state.token);
  // const token = localStorage.getItem("token");

  console.log(slug);


  if (!slug) {

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


    if (!slug) {
      return null;
    }

    setloading(true)


    var postData = {
      slug: slug,
    };
    postData = JSON.stringify(postData);

    fetch(serverUrl + "wp-json/promptshub/v2/get_order_by_hash", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
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


            console.log(res);



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
  }, [slug]);
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


        <div className='text-center'>
          Thank you for your order, Here are the order details, Please login to Account to see order trackings, payments and more.
        </div>



        {loading && (

          <div className='flex justify-center '>

            <Spinner />

          </div>

        )}

        {(!loading && orderData) && (

          <InvoiceWithPDF invoice={invoiceData} />


        )}




      </div>

    </div>
  )
}

export default page