"use client";
import { useState, useEffect, Component } from "react";
import { IconChevronDown, IconChevronUp, IconSquare, IconFidgetSpinner, IconTrash, IconHelpHexagon, IconStar, IconClockPause, IconExclamationCircle, IconRosetteDiscountCheck, IconX } from "@tabler/icons-react";

import { useCounterStore } from '../store/useCounterStore'

import ToggleContent from "./ToggleContent";
import TermsPicker from "./shop-elements/TermsPicker";
import TagsPicker from "./shop-elements/TagsPicker";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;


const FormCreateSupportTickets = (props) => {

  const { cartToggle, setcartToggle, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX, navToggle, setnavToggle, lang, setlang } = useCounterStore()





  var promptData = {
    "title": "",
    "email": userDataX?.email,
    "post_content": "",
    "post_status": "",
    "post_excerpt": "",
    "post_thumbnail": {
      "id": "",
      "src": ""
    },
    "post_thumbnail_url": "",
    "featured": false,
    "markedAs": "open",
    "priority": "1",
    "categories": [],
    "tags": [],
    "voteCount": 0,
    "loveCount": 0,
    "viewCount": 0,
    "prompt_id": 0,
  }



  var [currentObject, setcurrentObject] = useState(promptData);

  var [loading, setloading] = useState(false);
  var [errors, seterrors] = useState([]);
  var [submission, setsubmission] = useState({ id: null, success: false });



  function submit_ticket() {


    // if (!token) {
    //   addNotification({ type: 'error', title: 'Login Required', content: "Please Login to create tickets." })

    //   // //throw new Error("No token found");
    // }

    // if (currentObject.id < 0) {
    //   return;
    // }

    //var postData = currentObject;

    if (currentObject.title?.length == 0) {
      addNotification({ type: 'error', title: 'Ticket Title Required', content: "Ticket Title should not empty." })
      return;
    }
    if (currentObject.post_content?.length == 0) {
      addNotification({ type: 'error', title: 'Ticket Details Required', content: "Ticket Details should not empty." })
      return;
    }



    if (currentObject.email?.length == 0) {
      addNotification({ type: 'error', title: 'Email Address Required', content: "Email Address should not empty." })
      return;
    }


    var postData = JSON.stringify(currentObject);


    setloading(true);
    fetch(
      serverUrl + "wp-json/promptshub/v2/submit_ticket",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
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



            if (!success) {
              seterrors(errors)
            }
            if (success) {
              seterrors([])

              setsubmission({ ...submission, success: true })
            }


            setloading(false);
            //setcurrentObject(res)

            // setaddTask({ ...addTask, loading: false, errors: errors, success: success })

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




















  function toSlug(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')  // Remove non-alphanumeric chars
      .replace(/\s+/g, '-')          // Replace spaces with -
      .replace(/-+/g, '-');          // Replace multiple - with single -
  }


  function onPickCategories(item) {

    var itemX = { ...item }

    if (itemX.children) {
      delete itemX.children;
    }

    var categories = currentObject.categories;
    // const exists = categories.includes(itemX.term_id);  // true
    const exists = categories.find(term => term.term_id === item.term_id);



    if (exists) {

      const categoriesX = categories.filter(term => term.term_id !== itemX.term_id);
      setcurrentObject({ ...currentObject, categories: categoriesX });

    } else {
      categories.push(itemX)
      setcurrentObject({ ...currentObject, categories: categories });

    }
  }






  function onPickTags(items) {


    var tags = currentObject?.tags;
    const mergedUnique = [...new Set([...tags, ...items])];

    setcurrentObject({ ...currentObject, tags: mergedUnique });




  }




  const FAQTitle = ({ text, index }) => {

    return (
      <div className="flex gap-3 items-center">


        <div>{text}</div>
      </div>
    )

  }

  var faqs = [
    {
      "title": "What information should I include in my support ticket?",
      "content": "Please include: your username, email address, detailed description of the issue, steps to reproduce the problem, browser/device information, screenshots if applicable, and any error messages you're receiving. The more details you provide, the faster we can help you."
    },
    {
      "title": "How long does it take to get a response?",
      "content": "We typically respond within 24-48 hours during business days. For urgent issues affecting your account or payments, we prioritize these tickets and aim to respond within 12 hours."
    },
    {
      "title": "What types of issues can I submit through this form?",
      "content": "You can submit: technical issues with our AI tools, billing and subscription titles, account access problems, feature requests, bug reports, content moderation concerns, and general inquiries about PromptsHub services."
    },
    {
      "title": "I forgot which email I used for my account. What should I do?",
      "content": "No problem! Please submit your ticket using your current contact email and include your username in the description. We can look up your account and update the email if needed once we verify your identity."
    },
    {
      "title": "Can I attach files to my support ticket?",
      "content": "Yes, you can attach screenshots, error logs, or example files that help demonstrate your issue. Maximum file size is 10MB per attachment, and we support common image formats (JPG, PNG, GIF) and text files."
    },
    {
      "title": "How can I check the status of my existing ticket?",
      "content": "After submitting a ticket, you'll receive a confirmation email with your ticket number. You can reply directly to that email thread for updates. We'll also notify you when there are status changes or when we need more information."
    },
    {
      "title": "I haven't received a confirmation email for my ticket. What should I do?",
      "content": "First, check your spam or junk folder. If you still can't find it, wait 30 minutes and try submitting again. Make sure you're using a valid email address and that your inbox isn't full. If the issue persists, contact us through our social media channels."
    },
    {
      "title": "Is there a way to get faster support?",
      "content": "Yes! PromptsHub Premium subscribers receive priority support with faster response times. For all users, providing complete information and clear reproduction steps in your initial ticket helps us resolve issues more quickly."
    },
    {
      "title": "What's not appropriate for support tickets?",
      "content": "Please don't use this form for: promotional content, spam, harassment, illegal activities, or questions that are already answered in our FAQ. For general how-to questions, check our documentation and community forums first for faster answers."
    },
    {
      "title": "Can I request a feature through the support system?",
      "content": "Absolutely! We welcome feature requests and ideas. Please use the 'Feature Request' category when submitting your ticket and provide as much detail as possible about what you'd like to see and how it would benefit users."
    },
    {
      "title": "What if I need to update information in my submitted ticket?",
      "content": "Simply reply to the confirmation email you received for that ticket with the additional information. This will automatically update the existing ticket rather than creating a new one, keeping all context together."
    },
    {
      "title": "Do you provide support in languages other than English?",
      "content": "Currently, our primary support language is English. We can understand and respond to tickets in several major languages, but for the most accurate and timely responses, we recommend using English when possible."
    }
  ]




  return (
    <div className="flex gap-5 px-3 justify-center flex-wrap">

      <div className="flex flex-col gap-4 lg:w-[800px] w-full order-2 lg:order-1">

        {loading && (

          <div className="bg-white  rounded-sm px-5 py-3 flex justify-between items-center">
            <div>
              <div className="flex gap-2 text-amber-600">
                <div className="animate-spin"><IconFidgetSpinner /> </div>
                <div>{("Please wait")}</div>

              </div>



            </div>

          </div>
        )}

        {submission.success && (

          <div className="flex justify-between gap-2  bg-white  rounded-sm px-5 py-3">

            <div className="font-bold flex gap-2 ">
              <IconRosetteDiscountCheck />
              <div>{("Thanks for your submission")}</div>

            </div>

            <div className="text-red-600 cursor-pointer" onClick={ev => {
              setsubmission({ ...submission, success: false })

            }}>
              <IconX />
            </div>


          </div>

        )}


        {Object.entries(errors)?.length > 0 && (

          <div className="bg-white  rounded-sm px-5 py-3 flex justify-between items-center">
            <div>
              <div className="flex flex-col gap-2 text-red-400">

                <div className="font-bold">{("Errors")}</div>

                {Object.entries(errors).map(item => {

                  return (
                    <div className="py-1 flex gap-2">
                      <IconExclamationCircle /> <div>{item[1]}</div>
                    </div>
                  )

                })}

              </div>



            </div>

          </div>
        )}

        {/* <code>{JSON.stringify(currentObject)}</code> */}

        <div className="  bg-[#ffcbb3]  rounded-sm ">

          <div className="px-5 py-3 text-xl text-gray-700 border-b border-solid border-gray-700">{("Create Support Ticket")}</div>

          <div className="p-4 flex flex-col  gap-4">

            <div className="flex flex-col gap-3 ">
              <label htmlFor="" className="text-gray-700 ">
                {("Ticket Title")}
              </label>
              <input
                type="text"
                className="!shadow-none  !border-2 border-[#783009] px-2 py-1 rounded-sm w-full "
                value={currentObject?.title}
                onChange={(ev) => {
                  var value = ev.target.value;
                  var slug = toSlug(value);

                  setcurrentObject({ ...currentObject, title: value, slug: slug });
                }}
              />
            </div>



            <div className="flex flex-col gap-3">
              <label htmlFor="" className="text-gray-700 ">
                {("Ticket Details")}
              </label>
              <textarea
                type="text"
                className="!shadow-none h-40  !border-2 border-[#783009] px-2 py-1 rounded-sm w-full "
                value={currentObject?.post_content}
                onChange={(ev) => {
                  var value = ev.target.value;
                  setcurrentObject({ ...currentObject, post_content: value });
                }}
              />
            </div>




            <div className="flex flex-col gap-3 ">
              <label htmlFor="" className="text-gray-700 ">
                {("Your Email")}
              </label>
              <input
                type="email"
                className="!shadow-none  !border-2 border-[#783009] px-2 py-1 rounded-sm w-full "
                value={currentObject?.email}
                onChange={(ev) => {
                  var value = ev.target.value;
                  var slug = toSlug(value);

                  setcurrentObject({ ...currentObject, email: value, slug: slug });
                }}
              />
            </div>




          </div>
        </div>

        <div className="p-5 bg-[#ffcbb3]  rounded-sm">
          <div className="flex gap-3">

            <div className="text-2xl text-gray-700">{("Frequently Asked Questions")}</div>



          </div>
          <div className="my-4 flex flex-col gap-5 ">


            {faqs && (

              <div className="my-4">
                {faqs.map((item, index) => {

                  return (
                    <ToggleContent key={index} title={<FAQTitle text={item.title} index={index} />}
                      contentClass="text-gray-600 p-5"
                      headerClass="w-full flex justify-between items-center p-3 rounded-sm  bg-[#783009] cursor-pointer text-white"
                      headerTitleClass=""
                      wrapperClass=""
                      labelIcon={<IconHelpHexagon />}
                    >

                      <div className="">


                        {item?.content}


                      </div>

                    </ToggleContent>
                  )

                })}
              </div>
            )}


          </div>

        </div>



      </div>

      <div className=" rounded-sm lg:w-[400px] w-full order-1 lg:order-2">

        <div className="flex flex-col gap-4 ">

          <div className="bg-[#ffcbb3]   rounded-sm px-5 py-3 flex justify-end items-center">


            <div className="p-2  rounded-sm cursor-pointer px-4 bg-[#783009] text-white"
              onClick={ev => {
                submit_ticket()
              }}
            >{("Submit")}</div>
          </div>


          <div className="bg-[#ffcbb3]   rounded-sm ">

            <div className="px-5 py-3 text-xl text-gray-700 border-b border-solid border-[#783009]">{("Publish")}</div>

            <div className="p-4 flex flex-col text-sm gap-4">

              {/* <div className="flex justify-between items-center gap-3">
										<label htmlFor="" className="block ">
											{("Featured?")}
										</label>
										<div>
											<div onClick={ev => {
												var featured = !currentObject?.featured;
												setcurrentObject({ ...currentObject, featured: featured });
											}} className="p-2  rounded-sm cursor-pointer px-2 bg-[#783009] text-white">

												{currentObject?.featured && (
													<><IconStarFilled /></>
												)}
												{!currentObject?.featured && (
													<><IconStar /></>
												)}
											</div>
										</div>
									</div> */}



              <div className="flex justify-between items-center gap-3">
                <label htmlFor="priority" className="text-gray-700 ">
                  {("Priority")}
                </label>

                <select name="priority" id="" className="!shadow-none !border-2 border-indigo-600 border-solid px-2 py-1 rounded-sm   " onChange={ev => {

                  var value = ev.target.value;
                  setcurrentObject({ ...currentObject, priority: value });


                }}>

                  <option value="1" selected={currentObject?.priority == '1' ? "selected" : ""}>{("Normal")}</option>
                  <option value="10" selected={currentObject?.priority == '10' ? "selected" : ""}>{("High")}</option>
                  <option value="90" selected={currentObject?.priority == '90' ? "selected" : ""}>{("Urgent")}</option>


                </select>

              </div>







            </div>
          </div>




          <div className="bg-[#ffcbb3]   rounded-sm ">

            <div className="px-5 py-3  border-b border-solid border-[#783009] flex justify-between">
              <span className="text-xl text-gray-700">{("Categories")}</span>


            </div>

            <div className="p-4 flex flex-col  gap-4 h-[300px] overflow-y-auto">


              <TermsPicker taxonomy="ticket_cat" showCount={true} hierarchical={true} selected={currentObject?.categories} onPick={onPickCategories} />


            </div>
          </div>

          <div className="bg-[#ffcbb3]   rounded-sm ">

            <div className="px-5 py-3  border-b border-solid border-[#783009] flex justify-between">
              <span className="text-xl text-gray-700">{("Tags")}</span>


            </div>

            <div className="p-4 flex flex-col  gap-4">


              <div className="my-3">

                <div className="flex gap-2 items-center flex-wrap ">
                  {currentObject?.tags?.map((item, index) => {

                    return (
                      <div className="text-sm flex items-center gap-2 !shadow-none !border-2 border-[#783009] border-solid  pl-2 rounded-sm cursor-pointer  hover:text-white ">
                        <div>{item}</div>
                        <div className="hover:bg-red-400 px-1 py-1 rounded-sm" onClick={ev => {
                          var tags = currentObject.tags;
                          tags.splice(index, 1);

                          setcurrentObject({ ...currentObject, tags: tags });

                        }}><IconTrash /></div>
                      </div>
                    )
                  })}
                </div>


              </div>

              <TagsPicker taxonomy="ticket_tag" selected={currentObject?.tags} onPick={onPickTags} />


            </div>
          </div>










        </div>

      </div>

    </div>
  );
};

export default FormCreateSupportTickets;