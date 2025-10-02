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
import { useAuthStore } from "/store/authStore";


const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const mapId = process.env.NEXT_PUBLIC_MAP_ID;



const OrderSubscription = (props) => {
  const { formatDate } = useUtilsStore()
  var token = useAuthStore((state) => state.token);

  const { cartToggle, setcartToggle, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX, navToggle, setnavToggle, lang, setlang } = useCounterStore()

  var subscriptionId = props?.subscriptionId
  var [loading, setloading] = useState(false);

  var [subscriptionData, setsubscriptionData] = useState(props?.subscriptionData);


  useEffect(() => {
    get_subscription();
  }, [subscriptionId]);

  function get_subscription() {


    // if (!token) {
    //   throw new Error("No token found");
    // }

    setloading(true);

    var postData = {
      id: subscriptionId,
    };
    postData = JSON.stringify(postData);
    setloading(true);
    fetch(
      serverUrl + "wp-json/promptshub/v2/get_subscription",
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



            // setsubscriptionData()

            // var errors = res?.errors;
            // var success = res?.success;
            var subscription = res?.subscription;



            setloading(false);
            setsubscriptionData(subscription)



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

  function update_subscription() {

    setloading(true)

    var postData = JSON.stringify(subscriptionData);

    fetch(serverUrl + "wp-json/promptshub/v2/update_subscription", {
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
              addNotification({ type: 'success', title: 'Subscription update', content: message })
            }
            if (status == 'failed') {
              addNotification({ type: 'error', title: 'Subscription update failed', content: message })
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

          <div>Subscription</div>

          {subscriptionData?.id && (
            <div>
              <Link href={`/subscriptions/${subscriptionData?.id}/`}>#{subscriptionData?.id}</Link>
            </div>
          )}

        </div>
        <div className='flex gap-2 items-center'>
          {loading && (

            <Spinner />

          )}

          {hasAccess && (
            <div className='p-2  rounded-sm cursor-pointer px-4 bg-[#783009] text-white'

              onClick={ev => {
                update_subscription()
              }}
            >Update</div>
          )}





        </div>


      </div>








      <div className="border-0 border-b border-solid border-gray-200 lg:flex flex-wrap py-3 gap-3 items-center ">
        <div className="  py-2 lg:w-60 font-bold">{('Status')}</div>

        {!hasAccess && (
          <div>{subscriptionData?.status}</div>
        )}

        {hasAccess && (
          <select name="status" value={subscriptionData?.status} id="" onChange={ev => {
            var value = ev.target.value;
            setsubscriptionData({ ...subscriptionData, status: value })
          }}>

            <option value="">Choose</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="canceled">Canceled</option>

          </select>
        )}


      </div>

      <div className="border-0 border-b border-solid border-gray-200 lg:flex flex-wrap gap-3 py-3 items-center ">
        <div className="  py-2 lg:w-60 font-bold">{('Interval')}</div>
        {!hasAccess && (
          <div>{subscriptionData?.renewal_interval}</div>
        )}
        {hasAccess && (
          <select name="renewal_interval" value={subscriptionData?.renewal_interval} id="" onChange={ev => {
            var value = ev.target.value;
            setsubscriptionData({ ...subscriptionData, renewal_interval: value })
          }}>

            <option value="">Choose</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>

          </select>
        )}



      </div>










      <div className="border-0 border-b border-solid  border-gray-200 lg:flex flex-wrap gap-3 py-3 items-center">
        <div className="  py-2 lg:w-60 font-bold">{("Interval Count")}</div>
        {!hasAccess && (
          <div>{subscriptionData?.interval_count}</div>
        )}
        {hasAccess && (
          <div className="">
            <input type="number" className="lg:w-auto w-full" value={subscriptionData?.interval_count} onChange={ev => {
              var value = ev.target.value;
              setsubscriptionData({ ...subscriptionData, interval_count: value })
            }} />

          </div>
        )}



      </div>


      <div className="border-0 border-b border-solid border-gray-200 lg:flex flex-wrap gap-3 py-3 items-center ">
        <div className="  py-2 lg:w-60 font-bold">{("Next Billing Date")}</div>
        {subscriptionData?.status == 'active' && (
          <div className=""> {subscriptionData?.next_billing_date}</div>
        )}

      </div>
      <div className="border-0 border-b border-solid border-gray-200 lg:flex flex-wrap gap-3 py-3 items-center ">
        <div className="  py-2 lg:w-60 font-bold">{('Created')}</div>

        <div className=""> {subscriptionData?.created_at}</div>

      </div>


    </div>

  );
};

export default OrderSubscription;