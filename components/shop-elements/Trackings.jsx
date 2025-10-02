"use client";
import { useState, useEffect, Component } from "react";
import { IconChevronDown, IconChevronUp, IconSquare, IconUsersPlus, IconTrash, IconTrolley, IconClockPause, IconExclamationCircle, IconRosetteDiscountCheck, IconX, IconSquareRoundedPlusFilled, IconSquareRoundedMinusFilled, IconStarFilled, IconMessage2, IconMessages, IconShoppingCartCancel, IconLetterX, IconArrowNarrowRightDashed, IconArrowNarrowLeftDashed, } from "@tabler/icons-react";




import { useCounterStore } from '/store/useCounterStore'
import { useUtilsStore } from "/store/useUtilsStore";
// import LocationPicker from "/components/LocationPicker";
import PopoverButton from "/components/PopoverButton";
import Spinner from "../Spinner";
import GoogleMapLocationPicker from "/components/GoogleMapLocationPicker";
import GoogleMapDirections from "/components/GoogleMapDirections";


const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;



const Trackings = (props) => {
  const { formatDate } = useUtilsStore()

  const { cartToggle, setcartToggle, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX, navToggle, setnavToggle, lang, setlang } = useCounterStore()

  var delivery_id = props?.delivery_id
  var order_id = props?.order_id


  var [directions, setDirections] = useState(null);

  var [trackings, settrackings] = useState(props?.trackings);
  var [loading, setloading] = useState(false);
  var [isOpen, setisOpen] = useState(false);
  var [queryPrams, setqueryPrams] = useState({ paged: 1, order: "DESC", per_page: 5, });
  var [deliveryData, setdeliveryData] = useState(props.deliveryData);

  var [newTrackingData, setNewTrackingData] = useState({
    delivery_id: delivery_id,
    order_id: order_id,
    status: "",
    latlng: "",
    notes: "",
  });



  useEffect(() => {
    get_trackings();
  }, [delivery_id, queryPrams]);

  useEffect(() => {

    var waypointsX = []

    trackings?.posts?.map(item => {

      waypointsX.push(JSON.parse(item.latlng))

    })



    setDirections({

      origin: JSON.parse(deliveryData?.startLatLng),
      destination: JSON.parse(deliveryData?.endLatLng),
      waypoints: waypointsX


    })

  }, [trackings]);



  function get_trackings() {


    if (!delivery_id) {
      return;
    }




    var postData = {

      delivery_id: delivery_id,
      per_page: queryPrams.per_page,
      paged: queryPrams.paged,
      order: queryPrams.order,
    };
    postData = JSON.stringify(postData);
    setloading(true);

    fetch(serverUrl + "wp-json/promptshub/v2/get_trackings", {
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



            var posts = res?.posts;
            var total = res?.total;
            var max_pages = res?.max_pages;

            settrackings({ posts: posts, total: total, maxPages: max_pages })
            //setqueryPrams({ ...queryPrams, loading: false })
            setloading(false);


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


  function add_tracking() {




    var postData = JSON.stringify(newTrackingData);
    setloading(true);
    fetch(serverUrl + "wp-json/promptshub/v2/add_tracking", {
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




            var status = res?.status;
            var message = res?.message;

            if (status == 'success') {
              addNotification({ type: 'success', title: 'Tracking added', content: message })
              // setNewTrackingData({})
            } else {
              addNotification({ type: 'error', title: 'Tracking added failed', content: message })

            }

            setloading(false);
            setisOpen(false);




            get_trackings();


          });
        }
      })
      .catch((_error) => {
        //this.saveAsStatus = 'error';
        // handle the error
      });
  }


  function delete_trackings(ids) {


    // if (!token) {
    //   throw new Error("No token found");
    // }

    // if (queryPrams.page < 0) {
    //   return;
    // }

    ids = ids != undefined ? ids : selectedRows;



    var postData = {
      ids: ids,
    };
    postData = JSON.stringify(postData);
    setloading(true);
    fetch(serverUrl + "wp-json/promptshub/v2/delete_trackings", {
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

            setloading(false);

            get_trackings();




          });
        }
      })
      .catch((_error) => {
        //this.saveAsStatus = 'error';
        // handle the error
      });
  }

  const requiredRoles = ["administrator", "rider"];
  const hasAccess = requiredRoles.some(role => userDataX.roles.includes(role));


  const orderStatusMessages = [
    "Your order has been placed successfully.",
    "We’re waiting for your payment confirmation.",
    "Payment received. Your order is being processed.",
    "We’re preparing your order.",
    "Your items are packed and ready to go.",
    "Your order has been shipped.",
    "Your package is on the way.",
    "Your order is out for delivery.",
    "Your order has been delivered.",
    "We attempted delivery but missed you.",
    "Your order is being returned to the seller.",
    "Refund process has started.",
    "Your refund has been completed.",
    "Your order has been received by the restaurant.",
    "The kitchen is confirming your items.",
    "Your food is being prepared.",
    "Your food is ready for pickup.",
    "The rider has picked up your order.",
    "The rider is on the way to you.",
    "Your meal has been delivered.",
    "Your order has been created in the system.",
    "A shipping label has been generated.",
    "Courier has picked up your parcel.",
    "Your package is at the sorting facility.",
    "Your parcel has left the facility.",
    "Your shipment is moving through the network.",
    "Your package has arrived at the destination hub.",
    "Your package is out for delivery.",
    "Your shipment has been delivered.",
    "Your package is held at customs.",
    "Delivery failed due to an exception."
  ];

  function onTriggerOpenSampleNotes(args) {

    console.log(args);


  }





  return (
    <div>


      {hasAccess && (
        <div className="my-5 flex justify-end items-center gap-2">
          {loading && (
            <Spinner />
          )}
          <PopoverButton isOpen={isOpen} buttonLabel={("Add Tracking")} buttonIcon={<IconTrolley />} title={"Add Tracking"} position={""}>


            <div className='bg-white p-5'>




              <div className='flex gap-2 items-center justify-end '>

                {loading && (
                  <Spinner />
                )}

                <div
                  onClick={(ev) => {
                    add_tracking();
                  }}
                  className="!border-2 border-solid !border-gray-600 !shadow-none px-3 py-1 rounded-sm text-center  cursor-pointer col-span-2">
                  {("Submit")}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4   ">

                <div className="">
                  <div htmlFor="" className="flex justify-between items-center">

                    <div>Notes</div>


                    <PopoverButton buttonLabel={("Sample Notes")} buttonClass={` px-2 py-1 cursor-pointer `} buttonIcon={<IconMessages size={16} />} title={"Sample Notes"} position={""} onTriggerOpen={onTriggerOpenSampleNotes}>

                      <div className="bg-[#ffcbb3] p-5 flex flex-wrap gap-2">
                        {orderStatusMessages?.map((item, index) => {

                          return (
                            <div key={index} className="border flex gap-2 rounded-full border-[#783009] px-2 py-1 cursor-pointer hover:bg-[#ffcbb3]" onClick={ev => {


                              setNewTrackingData({
                                ...newTrackingData,
                                notes: item,
                              });

                            }}>
                              <IconMessage2 size={16} />
                              {item}</div>
                          )

                        })}

                      </div>

                    </PopoverButton>
                  </div>

                  <textarea name="" id="" className=" w-full  "
                    value={newTrackingData?.notes}
                    onChange={(ev) => {
                      setNewTrackingData({
                        ...newTrackingData,
                        notes: ev.target.value,
                      });
                    }}></textarea>


                </div>
                <div>
                  <div htmlFor="">Status</div>

                  <select name="status" className=" w-full !border-2 border-solid !border-gray-600 " value={newTrackingData?.status} id="" onChange={(ev) => {
                    setNewTrackingData({
                      ...newTrackingData,
                      status: ev.target.value,
                    });
                  }}>
                    <option value="">Choose</option>


                    <option value="order_placed">Order Placed</option>
                    <option value="packed">Packed</option>
                    <option value="shipped">Shipped / Dispatched</option>
                    <option value="in_transit">In Transit</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="delivery_attempted">Delivery Attempted</option>
                    <option value="returned_to_seller">Returned to Seller</option>
                    <option value="wait_for_customer">Waiting for Customer</option>
                    <option value="call_to_customer">Call to Customer</option>
                    <option value="call_to_seller">Call to Seller</option>

                    <option value="confirming_with_kitchen">Confirming with Kitchen</option>
                    <option value="preparing_food">Preparing Food</option>
                    <option value="ready_for_pickup">Ready for Pickup</option>
                    <option value="picked_up_by_rider">Picked up by Rider</option>
                    <option value="on_the_way">On the Way</option>

                    <option value="label_generated">Label Generated</option>
                    <option value="picked_up_from_sender">Picked up from Sender</option>
                    <option value="at_sorting_facility">At Sorting Facility</option>
                    <option value="departed_facility">Departed Facility</option>
                    <option value="in_transit_logistics">In Transit (Logistics)</option>
                    <option value="arrived_at_destination_hub">Arrived at Destination Hub</option>
                    <option value="out_for_delivery_logistics">Out for Delivery (Logistics)</option>
                    <option value="delivered_logistics">Delivered (Logistics)</option>
                    <option value="held_at_customs">Held at Customs</option>


                  </select>



                </div>
                <div className="lg:col-span-2" >
                  <div className="">Current Location</div>
                  {/* <LocationPicker markerDraggable={true} latlng={newTrackingData?.latlng} onLocationSelect={(coords) => {
                  setNewTrackingData({ ...newTrackingData, latlng: coords });
                }} /> */}

                  {/* {JSON.stringify(JSON.parse(deliveryData?.endLatLng))} */}


                  {deliveryData?.endLatLng && (
                    <GoogleMapLocationPicker destination={JSON.parse(deliveryData?.endLatLng)} onLocationChange={(location) => {
                      setNewTrackingData({ ...newTrackingData, latlng: location });

                      // location = { lat: number, lng: number }
                    }} />
                  )}



                </div>

              </div>



            </div>

          </PopoverButton>
        </div>

      )}


      {trackings?.posts.length == 0 && (
        <div className="bg-white shadow-sm  p-5 rounded-sm">
          No trackings yet, Please wait for rider response.
        </div>
      )}

      {directions?.waypoints.length > 0 && (
        <div className='pb-5'>

          {/* {JSON.stringify(directions?.waypoints.length)} */}


          <GoogleMapDirections origin={directions?.origin} destination={directions?.destination} waypoints={directions?.waypoints} />

        </div>
      )}

      {trackings?.posts.length > 0 && (
        <div className="flex flex-col gap-3">

          <div className="text-xl my-5">Tracking List</div>

          {trackings?.posts?.map(tracking => {

            return (
              <div key={tracking.id} className=' flex gap-3  items-center'>
                <div className="w-12 h-12  rounded-full bg-[#ffcbb3] "></div>
                <div className="bg-white flex-1 rounded-sm p-3 text-sm flex flex-col gap-2">

                  <div className="flex justify-start">
                    <div className="bg-blue-400 px-2 py-1 rounded-sm text-white">{tracking.status}</div>

                  </div>
                  <div>{tracking.notes}</div>
                  {/* <div>{tracking.latlng}</div> */}
                  <div className="flex gap-2 items-center">
                    <div>{formatDate(tracking.datetime)}</div>

                    {hasAccess && (
                      <div className="text-red-400 cursor-pointer flex gap-2 items-center" onClick={ev => {
                        delete_trackings([tracking.id])
                      }}>
                        <IconTrash size={16} /> Delete
                      </div>
                    )}


                  </div>
                </div>


              </div>
            )

          })}

        </div>
      )}



      {trackings?.posts?.length > 0 && (
        <div className="
					flex items-center justify-center gap-3  my-3">
          <div
            className="!border-2 border-solid border-gray-600 !shadow-none px-2 py-1 rounded-sm cursor-pointer"
            onClick={(ev) => {
              var paged = queryPrams.paged;


              if (paged == 1) return;
              setqueryPrams({ ...queryPrams, paged: queryPrams.paged - 1 });
            }}>
            <IconArrowNarrowLeftDashed />
          </div>

          <div>
            <input className="!border-2 border-solid !border-gray-600 !shadow-none px-2 py-1 rounded-sm cursor-pointer w-16 text-center" type="text" value={queryPrams.paged} onChange={ev => {
              var value = parseInt(ev.target.value)
              var paged = value;

              if (paged > trackings?.maxPages) return;
              setqueryPrams({ ...queryPrams, paged: paged });

            }} />
          </div>

          <div
            className="!border-2 border-solid border-gray-600 !shadow-none px-2 py-1 rounded-sm cursor-pointer"
            onClick={(ev) => {
              var paged = queryPrams.paged + 1;

              if (paged > trackings?.maxPages) return;
              setqueryPrams({ ...queryPrams, paged: paged });
            }}>
            <IconArrowNarrowRightDashed />
          </div>
        </div>

      )}


    </div>
  );
};

export default Trackings;