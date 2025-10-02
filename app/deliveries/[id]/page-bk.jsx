'use client'
import React, { use } from 'react'
import Link from "next/link";


import { useState, useEffect, useContext } from "react";

import ImageGallery from "/components/shop-elements/ImageGallery";
import Tabs from "/components/Tabs";
import Tab from "/components/Tab";
import Comments from "/components/shop-elements/Comments";
import RelatedPosts from "/components/shop-elements/RelatedPosts";
import Upsells from "/components/shop-elements/Upsells";
import ToggleContent from "/components/ToggleContent";
import { useCounterStore } from '/store/useCounterStore'
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
import { useAuthStore } from "/store/authStore";
import { IconSettings, IconCheckbox, IconSquare, IconFidgetSpinner, IconTrash, IconStarFilled, IconStar, IconExternalLink } from "@tabler/icons-react";


const page = ({ params }) => {
  const { id } = use(params)

  const token = useAuthStore((state) => state.token);


  const { appData, notifications, addNotification, userDataX, setUserDataX } = useCounterStore()

  var [currentObject, setcurrentObject] = useState(null);

  var [loading, setloading] = useState(false);



  function get_delivery() {


    // if (!token) {
    //   throw new Error("No token found");
    // }



    var postData = {
      id: id,
    };
    postData = JSON.stringify(postData);
    setloading(true);
    fetch(
      serverUrl + "wp-json/promptshub/v2/get_delivery",
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




            var errors = res?.errors;
            var success = res?.success;
            var trackings = res?.trackings;
            var delivery = res?.delivery;



            setloading(false);
            setcurrentObject(delivery)



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
  function update_delivery() {


    // if (!token) {
    //   throw new Error("No token found");
    // }

    // if (currentObject.id < 0) {
    //   return;
    // }

    //var postData = currentObject;

    currentObject.id = id;



    var postData = JSON.stringify(currentObject);


    setloading(true);
    fetch(
      serverUrl + "wp-json/promptshub/v2/update_delivery",
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
            var errors = res?.errors;
            var success = res?.success;


            setloading(false);

          });
        }
      })
      .catch((_error) => {
        //this.saveAsStatus = 'error';
        // handle the error
      });
  }






  useEffect(() => {
    get_delivery();

  }, []);


  var addonsList = [
    { label: "Products ", value: 'products' },
    { label: "Customer ", value: 'customer' },
    { label: "Expiry ", value: 'expiry' },
    { label: "Spend ", value: 'spend' },
    { label: "Categories ", value: 'categories' },
    { label: "User ", value: 'user' },


  ]






  function toSlug(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')  // Remove non-alphanumeric chars
      .replace(/\s+/g, '-')          // Replace spaces with -
      .replace(/-+/g, '-');          // Replace multiple - with single -
  }




  return (
    <div>


      <div className="flex-1 my-10">

        <div className="flex gap-5 justify-center">

          <div className="flex flex-col gap-4 w-[800px]">

            <div className="bg-white  rounded-sm px-5 py-3 flex justify-between items-center">
              <div>
                {loading && (
                  <div className="flex gap-2 text-amber-600">
                    <div className="animate-spin"><IconFidgetSpinner /> </div>
                    <div>Please wait...</div>

                  </div>
                )}
                {!loading && (
                  <div className="flex gap-2 justify-between items-center">

                    <div className="text-bold">Edit:</div> <div>{currentObject?.title}</div>

                  </div>
                )}

              </div>
              <Link className="flex gap-2 !border-2 border-gray-400 border-solid px-2 py-1 rounded-sm text-gray-600" href={`/product/${id}`}>
                <IconExternalLink /> View
              </Link>
            </div>


            {/* {JSON.stringify(currentObject?.addons)} */}

            <div className="bg-white  rounded-sm ">

              <div className="px-5 py-3 text-xl border-b border-solid border-gray-300">General Info</div>

              <div className="p-4 flex flex-col  gap-4">

                <div className="flex flex-col gap-3 ">
                  <label htmlFor="" className="block text-gray-500">
                    {("notes")}
                  </label>
                  <input
                    type="text"
                    className="!shadow-none !border-2 border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                    value={currentObject?.notes}
                    onChange={(ev) => {
                      var value = ev.target.value;
                      var slug = toSlug(value);

                      setcurrentObject({ ...currentObject, notes: value, });
                    }}
                  />
                </div>



                <div className="flex flex-col gap-3">
                  <label htmlFor="" className="block text-gray-500">
                    {("Order Id")}
                  </label>
                  <input
                    type="text"
                    className="!shadow-none !border-2 border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                    value={currentObject?.order_id}
                    onChange={(ev) => {
                      var value = ev.target.value;
                      setcurrentObject({ ...currentObject, order_id: value });


                    }}
                  />
                </div>










                <div className="flex flex-col gap-3">
                  <label htmlFor="" className=" text-gray-500">
                    {("Rider Id")}
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      className="!shadow-none !border-2 border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                      value={currentObject?.rider_id}
                      name="rider_id"
                      onChange={(ev) => {
                        var value = ev.target.value;
                        setcurrentObject({ ...currentObject, amount: value });


                      }}
                    />

                    {currentObject?.couponType == 'percent' && (
                      <span>%</span>
                    )}
                    {currentObject?.couponType == 'fixed' && (
                      <span>$</span>
                    )}


                  </div>
                </div>




                <div className="flex flex-col gap-3">
                  <label htmlFor="" className="block text-gray-500">
                    {("limit")}
                  </label>
                  <input
                    type="number"
                    className="!shadow-none !border-2 border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                    value={currentObject?.limit}
                    onChange={(ev) => {
                      var value = ev.target.value;
                      setcurrentObject({ ...currentObject, limit: value });


                    }}
                  />
                </div>

                <div className="flex flex-col  gap-3">
                  <label htmlFor="status" className=" text-gray-500">
                    {("Status")}
                  </label>

                  <select name="status" id="" className="!shadow-none !border-2 border-gray-400 border-solid px-2 py-1 rounded-sm  bg-white " onChange={ev => {

                    var value = ev.target.value;
                    setcurrentObject({ ...currentObject, type: value });


                  }}>

                    <option value="express" selected={currentObject?.type == 'express' ? "selected" : ""}>Express</option>
                    <option value="normal" selected={currentObject?.type == 'normal' ? "selected" : ""}>Normal</option>
                    <option value="free" selected={currentObject?.type == 'free' ? "selected" : ""}>Free</option>


                  </select>

                </div>










              </div>
            </div>









          </div>

          <div className=" rounded-sm px-3 w-[400px]">

            <div className="flex flex-col gap-4">

              <div className="bg-white  rounded-sm px-5 py-3 flex justify-between items-center">

                <div className="p-2 hover:bg-gray-400 rounded-sm cursor-pointer px-4 bg-gray-600 text-white"
                  onClick={ev => {
                    update_delivery()
                  }}
                >Update</div>
              </div>


              <div className="bg-white  rounded-sm ">

                <div className="px-5 py-3 text-xl border-b border-solid border-gray-300">Publish</div>

                <div className="p-4 flex flex-col text-sm gap-4">








                </div>
              </div>














            </div>

          </div>

        </div>


      </div>


    </div>
  )
}

export default page