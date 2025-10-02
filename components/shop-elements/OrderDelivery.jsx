"use client";
import { useState, useEffect, Component } from "react";
import { IconChevronDown, IconChevronUp, IconSquare, IconUsersPlus, IconTrash, IconTrolley, IconClockPause, IconExclamationCircle, IconRosetteDiscountCheck, IconX, IconSquareRoundedPlusFilled, IconSquareRoundedMinusFilled, IconStarFilled, IconStar, IconSearch, IconShoppingCartCancel, IconLetterX, IconArrowNarrowRightDashed, IconArrowNarrowLeftDashed, } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

import { APIProvider, Map, useMapsLibrary, useMap } from '@vis.gl/react-google-maps';

import { useAuthStore } from "/store/authStore";

import { useCounterStore } from '/store/useCounterStore'
import { useUtilsStore } from "/store/useUtilsStore";
import GoogleMapLocationPicker from "/components/GoogleMapLocationPicker";
// import LocationPicker from "/components/LocationPicker";
import GoogleMapDirections from "/components/GoogleMapDirections";
import PopoverButton from "/components/PopoverButton";
import UsersPicker from "/components/shop-elements/UsersPicker";
import Spinner from "../Spinner";


const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const mapId = process.env.NEXT_PUBLIC_MAP_ID;



const OrderDelivery = (props) => {
  const { formatDate } = useUtilsStore()
  var token = useAuthStore((state) => state.token);

  const { cartToggle, setcartToggle, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX, navToggle, setnavToggle, lang, setlang } = useCounterStore()

  var delivery_id = props?.delivery_id
  var order_id = props?.order_id
  var userid = props?.userid
  var delivery_location = props?.delivery_location
  var [orderData, setorderData] = useState(null);

  var [trackings, settrackings] = useState(props?.trackings);
  var [loading, setloading] = useState(false);
  var [isOpen, setisOpen] = useState(false);
  var [queryPrams, setqueryPrams] = useState({ keyword: "", category: "", paged: 1, order: "DESC", per_page: 5, });
  var [deliveryData, setdeliveryData] = useState(null);
  var [riderData, setriderData] = useState(null);
  var [directions, setDirections] = useState(null);

  var [newDeliveryData, setnewDeliveryData] = useState({
    userid: userid,
    order_id: order_id,
    rider_id: "",
    status: "",
    notes: "",
    startLatLng: delivery_location,
    endLatLng: delivery_location,
  });

  useEffect(() => {
    get_delivery();

  }, []);
  useEffect(() => {
    get_rider();



  }, [newDeliveryData?.rider_id]);


  function get_delivery() {


    // if (!token) {
    //   throw new Error("No token found");
    // }



    var postData = {
      order_id: order_id,
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
            var delivery = res?.delivery;



            setloading(false);

            if (delivery) {

              setdeliveryData(delivery)

              setDirections({

                origin: JSON.parse(delivery?.startLatLng),
                destination: JSON.parse(delivery?.endLatLng),
                waypoints: []
              })
            }








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
  function get_rider() {


    // if (!token) {
    //   throw new Error("No token found");
    // }



    var postData = {
      id: newDeliveryData?.rider_id,
    };
    postData = JSON.stringify(postData);
    setloading(true);
    fetch(
      serverUrl + "wp-json/promptshub/v2/get_rider",
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


            var rider = res?.rider;

            setriderData(rider)

            console.log(res);


            setloading(false);

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

  function start_delivery() {


    // if (!token) {
    // 	throw new Error("No token found");
    // }

    setDirections({

      origin: newDeliveryData?.startLatLng,
      destination: newDeliveryData?.endLatLng,
      waypoints: []


    })





    var postData = JSON.stringify(newDeliveryData);
    setloading(true);
    fetch(serverUrl + "wp-json/promptshub/v2/start_delivery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: postData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Token validation failed");
        }

        if (response.ok && response.status < 400) {
          response.json().then((res) => {



            var errors = res?.errors;
            var success = res?.success;
            var delivery_id = res?.delivery_id;

            setloading(false);


            var status = res?.status;
            var message = res?.message;

            if (status == 'success') {
              setdeliveryData({ ...deliveryData, id: delivery_id })

              get_delivery()
              addNotification({ type: 'success', title: 'Delivery started', content: message })
            } else {
              addNotification({ type: 'error', title: 'Delivery started failed', content: message })

            }





          });
        }
      })
      .catch((_error) => {
        //this.saveAsStatus = 'error';
        // handle the error
      });
  }



  function update_delivery() {

    setloading(true)

    var postData = JSON.stringify(deliveryData);

    fetch(serverUrl + "wp-json/promptshub/v2/update_delivery", {
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
              addNotification({ type: 'success', title: 'Delivery update', content: message })
            }
            if (status == 'failed') {
              addNotification({ type: 'error', title: 'Delivery update failed', content: message })
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

  function onUserPick(args) {



    setnewDeliveryData({
      ...newDeliveryData,
      rider_id: args?.ID,
    });
  }


  const requiredRoles = ["administrator", "rider"];
  const hasAccess = requiredRoles.some(role => userDataX?.roles?.includes(role));



  return (
    <div className='flex flex-col gap-4'>

      {hasAccess && (
        <div className='flex justify-end items-center gap-2'>

          {loading && (
            <Spinner />
          )}

          {deliveryData == null && (
            <PopoverButton buttonLabel={("Start Delivery")} buttonIcon={<IconTrolley />} title={"Start Delivery"} position={""} popoverClass={`mx-auto overflow-y-auto h-screen w-[90%] md:w-2/4 fixed inset-x-0 top-5 pb-10 z-20 shadow-sm rounded-sm`}>

              <div className="bg-[#ffcbb3] p-5">

                <div className='flex justify-end   items-center gap-2'>

                  {loading && (
                    <Spinner />
                  )}

                  <div
                    onClick={(ev) => {
                      start_delivery();
                    }}
                    className="  rounded-sm cursor-pointer px-4 py-2 bg-[#783009] text-white flex gap-2 w-max">
                    {("Submit")}
                  </div>
                </div>



                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5  ">
                  <div>
                    <div className="flex gap-2 mb-2 items-center">
                      <div>Rider:</div>
                      {riderData && (

                        <>
                          <div className="rounded-full overflow-hidden w-10 h-10">
                            <img src={riderData?.avatar} alt="" width={50} height={50} />
                          </div>
                          <div>{riderData?.name}{`(#${riderData?.id})`}</div>
                          <div className="text-red-400" onClick={ev => {
                            setriderData(null);
                          }}>Remove</div>
                        </>

                      )}



                    </div>

                    <UsersPicker role={`rider`} onPick={onUserPick} />


                  </div>
                  <div>
                    <div htmlFor="">Status</div>

                    <select name="status" className=" w-full  " value={newDeliveryData?.status} id="" onChange={(ev) => {
                      setnewDeliveryData({
                        ...newDeliveryData,
                        status: ev.target.value,
                      });
                    }}>
                      <option value="">Choose</option>
                      <option value="started">Started</option>
                      <option value="paused">Paused</option>
                      <option value="canceled">Canceled</option>
                    </select>



                  </div>


                  <div className="col-span-2">
                    <div htmlFor="">Notes</div>

                    <textarea name="" id="" className=" w-full  "
                      value={newDeliveryData?.notes}
                      onChange={(ev) => {
                        setnewDeliveryData({
                          ...newDeliveryData,
                          notes: ev.target.value,
                        });
                      }}></textarea>


                  </div>

                  <div className="col-span-2">
                    <div className="mb-5">Pickup Location</div>
                    {/* <LocationPicker markerDraggable={true} latlng={newDeliveryData?.startLatLng} onLocationSelect={(coords) => {

                    setnewDeliveryData({ ...newDeliveryData, startLatLng: coords });
                  }} /> */}

                    <GoogleMapLocationPicker onLocationChange={(location) => {
                      setnewDeliveryData({ ...newDeliveryData, startLatLng: location });

                      // location = { lat: number, lng: number }
                    }} />

                  </div>



                </div>
              </div>

            </PopoverButton>
          )}


          {deliveryData != null && (
            <div className='flex gap-3 items-center justify-between'>
              <div className='flex gap-3 items-center'>
                <div htmlFor="">Status</div>

                <select name="status" className=" w-full  " value={deliveryData?.status} id="" onChange={(ev) => {
                  setdeliveryData({
                    ...deliveryData,
                    status: ev.target.value,
                  });
                }}>
                  <option value="">Choose</option>
                  <option value="started">Started</option>
                  <option value="paused">Paused</option>
                  <option value="canceled">Canceled</option>
                </select>



              </div>

              <div className='flex gap-2 items-center'>
                {loading && (

                  <Spinner />

                )}
                <div className='p-2  rounded-sm cursor-pointer px-4 bg-[#783009] text-white'

                  onClick={ev => {
                    update_delivery()
                  }}
                >Update</div>

              </div>


            </div>
          )}


        </div>
      )}



      {/* {JSON.stringify(riderData)} */}
      {!riderData?.id && (
        <div className="bg-white shadow-sm  p-5 rounded-sm">
          Delivery hasn't stated yet, Pleast wait for response.
        </div>
      )}



      {riderData?.id && (
        <div className="bg-white shadow-sm  p-5 rounded-sm">

          <div className="text-xl font-bold mb-3">About Rider</div>

          <div className="flex justify-between ">
            <div className="flex gap-3">
              <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                <Image src={riderData?.avatar} width={50} height={50} alt={``} />
              </div>
              <div className="flex flex-col gap-1">
                <Link className="text-lg" href={`/rider/${riderData.id}`}>{riderData?.name}</Link>
                <div className="text-sm">Email: {riderData?.email}</div>
                <div className="text-sm">Phone: <Link className="italic" href={`tel:${riderData?.phone}`}>{riderData?.phone}</Link></div>


              </div>
            </div>
            <div className="text-right hidden">
              <div>Total Delivery: 125</div>
              <div>Rating : 4.8/5</div>
            </div>
          </div>




        </div>
      )}



      {directions?.origin && (
        <div className="pb-20">
          <GoogleMapDirections origin={directions?.origin} destination={directions?.destination} waypoints={directions?.waypoints} />
        </div>

      )}


      {/* <div className="bg-white shadow-sm  p-5 rounded-sm">
        {deliveryData?.startLatLng && (
          <div className=" flex flex-col gap-4">
            <div className="text-lg">Rider Pickup Location</div>
            <LocationPicker markerDraggable={false} latlng={JSON.parse(deliveryData?.startLatLng)} />
          </div>
        )}
      </div>

      <div className="bg-white shadow-sm  p-5 rounded-sm">
        {delivery_location && (
          <div className=" flex flex-col gap-4">
            <div className="text-lg">Delivery Location</div>
            <LocationPicker markerDraggable={false} latlng={delivery_location} />
          </div>
        )}
      </div> */}







    </div>

  );
};

export default OrderDelivery;