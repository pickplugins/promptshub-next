// store/useUtilsStore.js
import { create } from "zustand";
import { useCounterStore } from "./useCounterStore";
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const useUtilsStore = create(() => ({


  toTitleCase: (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },

  wrapCurrency: (value) => {
    const currencySymbole = useCounterStore.getState().currencySymbole;
    const currencyPosition = useCounterStore.getState().currencyPosition;
    var string = "";

    if (currencyPosition == 'before') {
      string = `${currencySymbole} ${value}`;

    }
    if (currencyPosition == 'after') {
      string = `${value} ${currencySymbole}`;


    }
    return string;
  },
  priceHtml: (entry) => {

    var price = entry?.price
    var regularPrice = entry?.regularPrice




    const currencySymbole = useCounterStore.getState().currencySymbole;
    const currencyPosition = useCounterStore.getState().currencyPosition;
    var string = "";

    if (currencyPosition == 'before') {
      string = `<span>${currencySymbole}${price}</span>`;
      if (regularPrice) {
        string += `<span class="line-through">${currencySymbole}${regularPrice}</span>`;
      }
    }
    if (currencyPosition == 'after') {
      string = `<span>${price}${currencySymbole} </span>`;
      if (regularPrice) {
        string += `<span class="line-through">${regularPrice}${currencySymbole} </span>`;
      }
    }




    return string;
  },






  formatDate: (dateTimeStr, format = "DD-MM-YYYY HH:mm A") => {
    const date = new Date(dateTimeStr.replace(' ', 'T'));
    if (isNaN(date)) return "Invalid Date";

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    // Determine AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
    const hourStr = String(hours).padStart(2, '0');

    // Replace tokens in format string
    return format
      .replace("DD", day)
      .replace("MM", month)
      .replace("YYYY", year)
      .replace("HH", hourStr)
      .replace("mm", minutes)
      .replace("ss", seconds)
      .replace("A", ampm) // Uppercase AM/PM
      .replace("a", ampm.toLowerCase()); // Lowercase am/pm
  },
  addNumbers: (a, b) => {
    return a + b;
  },

  generateToken: () => {
    return Math.random().toString(36).substring(2);
  },

  // 🔹 New method: Track page visit
  trackPageVisit: async (trackPrams) => {



    try {
      const response = await fetch(serverUrl + "wp-json/promptshub/v2/add_activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: trackPrams?.userid,
          event: trackPrams?.event,
          source: trackPrams?.source,
          value: { productId: trackPrams?.productId },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to track visit");
      }

      return await response.json();
    } catch (error) {
      console.error("Track visit error:", error);
      return null;
    }
  },







}));
