"use client"
import { useState, useEffect } from "react";
import { IconPhoneIncoming, IconRosetteDiscountCheck, IconX, IconSend, IconIdBadge2 } from "@tabler/icons-react";
import { useCounterStore } from '/store/useCounterStore'
import Spinner from "/components/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RequestForStock = (props) => {

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const { appData, cartToggle, setcartToggle, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX, navToggle, setnavToggle, lang, coupons, setCoupons, cartTotalPay, setcartTotalPay, cartTotal, setcartTotal, shippingCost, setshippingCost } = useCounterStore()

  var productData = props?.productData

  var id = productData?.id




  const [isOpen, setIsOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [requestData, setrequestData] = useState({
    product_id: id,
    phone: userDataX?.phone,
    name: userDataX?.name,
    email: userDataX?.email,
    title: `Request for Stock #${id}`,
    post_content: "",

  }); // interval: weekly, monthly, 



  useEffect(() => {

    setrequestData({ ...requestData, user_id: userDataX?.id })

  }, [userDataX?.id]);
  useEffect(() => {



  }, [requestData?.interval]);




  function requestDataCall() {



    setloading(true);
    var postData = JSON.stringify(requestData);

    var url = serverUrl + "wp-json/promptshub/v2/submit_ticket";


    var headers = {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`
    }


    fetch(url, {
      method: "POST",
      headers: headers,
      body: postData,
    })
      .then((response) => {

        if (!response.ok) {
          throw new Error('Token validation failed');
        }

        if (response.ok && response.status < 400) {
          response.json().then((res) => {

            var success = res?.success;
            var error = res?.error;




            if (success) {
              addNotification({ type: 'success', title: 'Request Sent Successful', content: "Thank for your request." })

            }
            if (error) {
              addNotification({ type: 'error', title: 'Request Sent failed', content: "Sorry, There is an error sending request." })

            }



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









  return (
    <div className={`flex gap-2 items-center relative`}>



      <div onClick={ev => {

        setIsOpen(!isOpen);

      }} className="border-2 border-[#783009]  cursor-pointer  px-4 py-[10px] rounded-sm flex gap-3">

        <IconSend />

        <div>
          Request for Stock
        </div>

      </div>

      {isOpen && (

        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 xl:h-auto h-[450px] overflow-y-auto z-40 shadow-sm rounded-sm bg-white  w-[90%] md:w-[700px]  ">


          <div className="bg-[#ffcbb3] p-3 flex  justify-between">

            <div>Request for Stock</div>
            <div className="cursor-pointer" onClick={ev => {

              setIsOpen(!isOpen);

            }}>

              <IconX />
            </div>

          </div>

          <div className="flex-wrap lg:flex-nowrap flex justify-between  p-4 gap-5">
            <div className="flex flex-col gap-4 w-[300px] lg:order-1 order-2">



              <div className="flex flex-col gap-2">
                <label htmlFor="">Name</label>
                <input type="text" placeholder={""} value={requestData?.name} onChange={ev => {
                  var value = ev.target.value;
                  setrequestData({ ...requestData, name: value })
                }} />
              </div>


              <div className="flex flex-col gap-2">
                <label htmlFor="">Email</label>
                <input type="email" placeholder={""} value={requestData?.email} onChange={ev => {
                  var value = ev.target.value;
                  setrequestData({ ...requestData, email: value })
                }} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Phone Number</label>
                <input type="text" placeholder={"0173703...."} value={requestData?.phone} onChange={ev => {
                  var value = ev.target.value;
                  setrequestData({ ...requestData, phone: value })
                }} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Message</label>
                <textarea name="" id="" value={requestData?.post_content} onChange={ev => {
                  var value = ev.target.value;
                  setrequestData({ ...requestData, post_content: value })
                }}></textarea>
              </div>




              <div className="flex flex-col gap-2">

                <div onClick={ev => {
                  requestDataCall()
                }} className="bg-[#ffcbb3] px-3 justify-center flex gap-3 items-centergap-2 py-2  rounded-sm cursor-pointer">



                  <div>
                    Submit
                  </div>
                  {loading && (
                    <div>
                      <Spinner />
                    </div>
                  )}
                </div>
              </div>








            </div>
            <div className="lg:order-2 order-1">

              <div className="">

                <div className="text-lg mb-4">How it works?</div>

                <ul className=" flex flex-col gap-2">

                  <li className="flex gap-2" ><div className="w-6"><IconRosetteDiscountCheck size={25} /></div>Our team will check product availability.</li>
                  <li className="flex gap-2"><div className="w-6"><IconRosetteDiscountCheck size={25} /></div>Inform to product sourcing manager.</li>
                  <li className="flex gap-2"><div className="w-6"><IconRosetteDiscountCheck size={25} /></div>We will collect product if possible.</li>
                  <li className="flex gap-2"><div className="w-6"><IconRosetteDiscountCheck size={25} /></div>Will stock for you and send email and phone call to inform.</li>

                </ul>



                <div className="my-5">

                  {requestData?.interval == "day" && (
                    <div>
                      You choose <strong>daily</strong>, you will received call next <strong>{addDays(requestData?.start_date, 1)}</strong>
                    </div>
                  )}
                  {requestData?.interval == "week" && (
                    <div>
                      You choose <strong>weekly</strong>, you will received call next <strong>{addDays(requestData?.start_date, 7)}</strong>
                    </div>
                  )}

                  {requestData?.interval == "month" && (
                    <div>
                      You choose <strong>monthly</strong>, you will received call next <strong>{addDays(requestData?.start_date, 30)}</strong>
                    </div>
                  )}


                  {requestData?.interval == "year" && (
                    <div>
                      You choose <strong>{requestData?.interval}</strong>, you will received call next <strong>{addDays(requestData?.start_date, 365)}</strong>
                    </div>
                  )}






                </div>

              </div>





            </div>
          </div>



        </div>

      )}



    </div>
  );
};

export default RequestForStock;
