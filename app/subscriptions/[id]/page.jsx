'use client'
import React, { use } from 'react'
import { useState, useEffect, useContext } from "react";
import { useCounterStore } from '/store/useCounterStore'
import Link from "next/link";
import Spinner from "/components/Spinner";
import { useAuthStore } from "/store/authStore";

const page = ({ params }) => {

  const token = useAuthStore((state) => state.token);

  if (!token) {

    return (
      <div className='p-10 text-center text-red-400'>You are not authorized to access this page</div>
    )
  }

  const { id } = use(params)
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const { appData, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX } = useCounterStore()

  var [subscriptionData, setsubscriptionData] = useState(null);
  var [subscriptionURLs, setsubscriptionURLs] = useState(null);
  var [orderData, setorderData] = useState(null);
  var [loading, setloading] = useState(null);



  function get_subscription() {


    // if (!token) {
    //   throw new Error("No token found");
    // }
    var postData = {
      id: id,
    };
    postData = JSON.stringify(postData);

    fetch(serverUrl + "wp-json/promptshub/v2/get_subscription", {
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




            var subscription = res?.subscription;
            var order = res?.order;



            setsubscriptionData(subscription)
            setorderData(order)



            setTimeout(() => {
            }, 500);
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

  // useEffect(() => {
  // 	get_subscription();
  // }, []);

  useEffect(() => {
    get_subscription();
  }, [id]);



  return (
    <div>
      <div className="w-[900px] mx-auto gap-5 p-5">
        <div className="bg-white shadow-sm border border-gray-200 p-5 rounded-sm">


          <div className='flex justify-between items-center'>
            <div className="text-xl flex gap-3 items-center">

              <div>Subscription</div>

              {subscriptionData?.id && (
                <div>
                  #{subscriptionData?.id}
                </div>
              )}

            </div>
            <div className='flex gap-2 items-center'>
              {loading && (

                <Spinner />

              )}
              <div className='p-2  rounded-sm cursor-pointer px-4 bg-[#783009] text-white'

                onClick={ev => {
                  update_subscription()
                }}
              >Update</div>

            </div>


          </div>



          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-60 font-bold">{('Status')}</div>

            <div className=" my-3">

              <select name="status" value={subscriptionData?.status} id="" onChange={ev => {
                var value = ev.target.value;
                setsubscriptionData({ ...subscriptionData, status: value })
              }}>

                <option value="active">Active</option>
                <option value="paused">Pause</option>
                <option value="canceled">Cancel</option>

              </select>


            </div>
          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center">
            <div className=" px-5 py-2 w-60 font-bold">{("Interval")}</div>
            <div className=""> {subscriptionData?.renewal_interval}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center">
            <div className=" px-5 py-2 w-60 font-bold">{("Interval Count")}</div>
            <div className=""> {subscriptionData?.interval_count}</div>

          </div>


          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-60 font-bold">{("Next Billing Date")}</div>

            <div className=""> {subscriptionData?.next_billing_date}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-60 font-bold">{('Created')}</div>

            <div className=""> {subscriptionData?.created_at}</div>

          </div>







        </div>
        <div></div>
      </div>

    </div>
  )
}

export default page