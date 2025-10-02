'use client'
import React, { use } from 'react'
import { useState, useEffect, useContext } from "react";
import { useCounterStore } from '/store/useCounterStore'

const page = ({ params }) => {
  const { id } = use(params)
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const { appData, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX } = useCounterStore()

  var [subscriptionData, setsubscriptionData] = useState(null);
  var [subscriptionURLs, setsubscriptionURLs] = useState(null);
  var [orderData, setorderData] = useState(null);

  useEffect(() => {


  }, [subscriptionData]);



  function fetchPost() {


    if (!token) {
      //throw new Error("No token found");
    }
    var postData = {
      id: id,
    };
    postData = JSON.stringify(postData);

    fetch(serverUrl + "wp-json/promptshub/v2/get_subscription", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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

            var urls = subscription?.urls;

            var urls = JSON.parse(urls)

            setsubscriptionURLs(urls);


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

  // useEffect(() => {
  // 	fetchPost();
  // }, []);

  useEffect(() => {
    fetchPost();
  }, [id]);



  return (
    <div>
      <div className="grid grid-cols-2 gap-5 p-5">
        <div className="bg-white shadow-sm border border-gray-200 p-5 rounded-sm">

          <h3 className="text-xl my-5">{("Subscription")} </h3>


          <div className="flex gap-2 items-center my-5">

            <a target="_blank" className="p-2  rounded-sm cursor-pointer px-4 bg-[#783009] text-white" href={subscriptionURLs?.customer_portal}>{("Customer Portal")}</a>
            <a target="_blank" className="p-2  rounded-sm cursor-pointer px-4 bg-[#783009] text-white" href={subscriptionURLs?.customer_portal_update_subscription}>{("Update Subscription")}</a>
            <a target="_blank" className="p-2  rounded-sm cursor-pointer px-4 bg-[#783009] text-white" href={subscriptionURLs?.update_payment_method}>{("Update Payment Method")}</a>

          </div>


          <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center">
            <div className=" px-5 py-2 w-40 font-bold">{("Order")}</div>
            <div className=""> <a href={`/orders/${orderData?.id}`}>#{orderData?.id}</a></div>

          </div>
          <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center">
            <div className=" px-5 py-2 w-40 font-bold">{("Setup fee")}</div>
            <div className=""> {subscriptionData?.setup_fee}</div>

          </div>



          <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center">
            <div className=" px-5 py-2 w-40 font-bold">{("Total")}</div>
            <div className=""> {subscriptionData?.total}</div>

          </div>


          <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{("Billing Date")}</div>

            <div className=""> {subscriptionData?.billing_anchor}</div>

          </div>
          <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{("Card Last Four")}</div>

            <div className=""> {subscriptionData?.card_last_four}</div>

          </div>
          <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{("Test Mode")} </div>

            <div className=""> {subscriptionData?.test_mode}</div>

          </div>
          <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{("Status")}</div>

            <div className=""> {subscriptionData?.status}</div>
          </div>
          <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{("User Email")}</div>

            <div className=""> {subscriptionData?.user_email}</div>
          </div>


          <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold" >{("Trial Ends at")}</div>

            <div className=""> {subscriptionData?.trial_ends_at}</div>

          </div>
          <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{("Renews at")}</div>

            <div className=""> {subscriptionData?.renews_at}</div>
          </div>
          <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{("Ends at")}</div>

            <div className=""> {subscriptionData?.ends_at}</div>
          </div>







        </div>
        <div></div>
      </div>

    </div>
  )
}

export default page