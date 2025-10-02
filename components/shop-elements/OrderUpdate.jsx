"use client";
import { useState, useEffect, Component } from "react";
import { IconChevronDown, IconChevronUp, IconSquare, IconUsersPlus, IconTrash, IconTrolley, IconClockPause, IconExclamationCircle, IconRosetteDiscountCheck, IconX, IconSquareRoundedPlusFilled, IconSquareRoundedMinusFilled, IconStarFilled, IconStar, IconSearch, IconShoppingCartCancel, IconLetterX, IconArrowNarrowRightDashed, IconArrowNarrowLeftDashed, } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

import { APIProvider, Map, useMapsLibrary, useMap } from '@vis.gl/react-google-maps';


import { useCounterStore } from '/store/useCounterStore'
import { useUtilsStore } from "/store/useUtilsStore";
import LocationPicker from "/components/LocationPicker";
import GoogleMapDirections from "/components/GoogleMapDirections";
import PopoverButton from "/components/PopoverButton";
import Spinner from "../Spinner";


const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const mapId = process.env.NEXT_PUBLIC_MAP_ID;
import { useAuthStore } from "/store/authStore";



const OrderUpdate = (props) => {
  const { formatDate } = useUtilsStore()
  var token = useAuthStore((state) => state.token);

  const { cartToggle, setcartToggle, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX, navToggle, setnavToggle, lang, setlang } = useCounterStore()

  var orderId = props?.order_id
  var [loading, setloading] = useState(false);

  var [orderData, setorderData] = useState(props?.orderData);


  useEffect(() => {
    get_order();
  }, [orderId]);

  function get_order() {


    // if (!token) {
    //   throw new Error("No token found");
    // }

    setloading(true);

    var postData = {
      id: orderId,
    };
    postData = JSON.stringify(postData);
    setloading(true);
    fetch(
      serverUrl + "wp-json/promptshub/v2/get_order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: postData,
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Token validation failed");
        }

        if (response.ok && response.status < 400) {
          response.json().then((res) => {



            // setorderData()

            // var errors = res?.errors;
            // var success = res?.success;
            var order = res?.order;



            setloading(false);
            setorderData(order)



            // setTimeout(() => {
            // 	setaddTask({ ...addTask, title: "", success: null, errors: null })

            // }, 3000);
          });
        }
      })
      .catch((_error) => {
        //this.saveAsStatus = 'error';
        // handle the error
      });
  }

  function update_order() {

    setloading(true)

    var postData = JSON.stringify(orderData);

    fetch(serverUrl + "wp-json/promptshub/v2/update_order", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
      body: postData,
    })
      .then((response) => {

        if (!response.ok) {
          throw new Error('Token validation failed');
        }

        if (response.ok && response.status < 400) {
          response.json().then((res) => {




            var status = res?.status;
            var message = res?.message;

            if (status == 'success') {
              addNotification({ type: 'success', title: 'Order update', content: message })
            }
            if (status == 'failed') {
              addNotification({ type: 'error', title: 'Order update failed', content: message })
            }



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


  const requiredRoles = ["administrator", "rider", ""];
  const hasAccess = requiredRoles.some(role => userDataX?.roles?.includes(role));




  return (
    <div className="bg-white shadow-sm border border-gray-200 p-5 rounded-sm">



      <div className='flex justify-between items-center'>
        <div className="text-xl flex gap-3 items-center">

          <div>Update Order</div>


        </div>
        <div className='flex gap-2 items-center'>
          {loading && (

            <Spinner />

          )}

          {hasAccess && (
            <div className='p-2  rounded-sm cursor-pointer px-4 bg-[#783009] text-white'

              onClick={ev => {
                update_order()
              }}
            >Update</div>
          )}





        </div>


      </div>



      {/* {JSON.stringify(orderData)} */}





      <div className="border-0 border-b border-solid border-gray-200 lg:flex flex-wrap py-3 gap-3 items-center ">
        <div className="  py-2 lg:w-60 font-bold">{('Status')}</div>

        {!hasAccess && (
          <div>{orderData?.status}</div>
        )}

        {hasAccess && (
          <select name="status" value={orderData?.status} id="" onChange={ev => {
            var value = ev.target.value;
            setorderData({ ...orderData, status: value })
          }}>

            <option value="">Choose</option>
            <option value="hold">On hold</option>
            <option value="processing">Processing </option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
            <option value="refunded">Refunded</option>
            <option value="failed">Failed</option>

          </select>
        )}


      </div>

      <div className="border-0 border-b border-solid border-gray-200 lg:flex flex-wrap gap-3 py-3 items-center ">
        <div className="  py-2 lg:w-60 font-bold">{('Payment Method')}</div>
        {!hasAccess && (
          <div>{orderData?.payment_method}</div>
        )}
        {hasAccess && (
          <select name="payment_method" value={orderData?.payment_method} id="" onChange={ev => {
            var value = ev.target.value;
            setorderData({ ...orderData, payment_method: value })
          }}>

            <option value="">Choose</option>
            <option value="COD">COD</option>


          </select>
        )}



      </div>

      <div className="border-0 border-b border-solid border-gray-200 lg:flex flex-wrap gap-3 py-3 items-center ">
        <div className="  py-2 lg:w-60 font-bold">{('Payment status')}</div>
        {!hasAccess && (
          <div>{orderData?.payment_status}</div>
        )}
        {hasAccess && (
          <select name="payment_status" value={orderData?.payment_status} id="" onChange={ev => {
            var value = ev.target.value;
            setorderData({ ...orderData, payment_status: value })
          }}>

            <option value="">Choose</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="delayed">Delayed</option>

          </select>
        )}



      </div>
      <div className="border-0 border-b border-solid border-gray-200 lg:flex flex-wrap gap-3 py-3 items-center ">
        <div className="  py-2 lg:w-60 font-bold">{('Shipping Method')}</div>
        {!hasAccess && (
          <div>{orderData?.shipping_method}</div>
        )}
        {hasAccess && (
          <select name="shipping_method" value={orderData?.shipping_method} id="" onChange={ev => {
            var value = ev.target.value;
            setorderData({ ...orderData, shipping_method: value })
          }}>

            <option value="">Choose</option>
            <option value="free">Free</option>
            <option value="express">Express</option>
            <option value="normal">Normal</option>

          </select>
        )}



      </div>










      <div className="border-0 border-b border-solid  border-gray-200 lg:flex flex-wrap gap-3 py-3 items-center">
        <div className="  py-2 lg:w-60 font-bold">{("Transaction ID")}</div>
        {!hasAccess && (
          <div>{orderData?.transaction_id}</div>
        )}
        {hasAccess && (
          <div className="">
            <input type="text" className="lg:w-auto w-full" value={orderData?.transaction_id} onChange={ev => {
              var value = ev.target.value;
              setorderData({ ...orderData, transaction_id: value })
            }} />

          </div>
        )}



      </div>



      <div className="border-0 border-b border-solid border-gray-200 lg:flex flex-wrap gap-3 py-3 items-center ">
        <div className="  py-2 lg:w-60 font-bold">{('Created')}</div>

        <div className=""> {orderData?.created_at}</div>

      </div>


    </div>

  );
};

export default OrderUpdate;