"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ipfjrjntatvbfxxyatre.supabase.co";
const supabaseKey = "sb_publishable_ZImqo6GMlDfRYUy4Fn0vxA_cXOXdX46";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [formData, setFormData] = useState({
    full_name: "",
    tiktok_link: "",
    facebook_link: "",
    shopee_link: "",
    viber_number: "",
    contact_person: "",
    contact_number: "",
    complete_address: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    for (const key of Object.keys(formData)) {
      const val = formData[key as keyof typeof formData];
      if (!val || val.trim() === "") {
        setErrorMsg("Invalid: May isang box na hindi mo sinagutan. Paki-check po lahat.");
        return;
      }
    }

    setLoading(true);
    const { error } = await supabase.from("applicants").insert([formData]);
    setLoading(false);

    if (error) {
      setErrorMsg("May nangyaring error sa pag-submit. Subukan ulit.");
    } else {
      setSuccess(true);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl mb-8 flex justify-center">
        <img src="/affordlogo.png" alt="Logo" className="w-full max-w-md object-contain drop-shadow-xl" />
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-6 mb-16">
        <img src="/image1.png" alt="Announcement" className="w-full rounded-2xl shadow-xl" />
        <img src="/image2.png" alt="Qualifications" className="w-full rounded-2xl shadow-xl" />
        <img src="/image3.png" alt="Guide" className="w-full rounded-2xl shadow-xl" />
      </div>

      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl border-t-8 border-blue-600 mb-16" id="apply-form">
         <h2 className="text-3xl font-black text-blue-800 mb-2 text-center">APPLY NOW</h2>
         <p className="text-center text-gray-500 mb-6 text-sm">Fill out this form completely to submit your application.</p>

         {success ? (
           <div className="bg-blue-50 border-2 border-blue-500 p-6 rounded-xl text-center">
             <h3 className="text-xl font-bold text-blue-900 mb-2">Application Submitted!</h3>
             <p className="text-blue-700">Antayin ang message ng affordaprice sa inyong viber kung kayo ay approved.</p>
           </div>
         ) : (
           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
             {errorMsg && (
               <div className="bg-red-50 border border-red-400 text-red-600 p-3 rounded-lg text-sm font-medium text-center">
                 {errorMsg}
               </div>
             )}

             <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">FULL NAME:</label>
               <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 text-black focus:ring-2 focus:ring-blue-500 outline-none" />
             </div>

             <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Tiktok link:</label>
               <input type="text" name="tiktok_link" value={formData.tiktok_link} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 text-black focus:ring-2 focus:ring-blue-500 outline-none" />
             </div>

             <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Facebook link:</label>
               <input type="text" name="facebook_link" value={formData.facebook_link} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 text-black focus:ring-2 focus:ring-blue-500 outline-none" />
             </div>

             <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Shopee link:</label>
               <input type="text" name="shopee_link" value={formData.shopee_link} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 text-black focus:ring-2 focus:ring-blue-500 outline-none" />
             </div>

             <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Viber number:</label>
               <input type="text" name="viber_number" value={formData.viber_number} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 text-black focus:ring-2 focus:ring-blue-500 outline-none" />
             </div>

             <div className="border-t pt-4 mt-2">
               <h3 className="text-lg font-bold text-blue-800 mb-3">DELIVERY DETAILS</h3>
             </div>

             <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Contact person:</label>
               <input type="text" name="contact_person" value={formData.contact_person} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 text-black focus:ring-2 focus:ring-blue-500 outline-none" />
             </div>

             <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Contact number:</label>
               <input type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 text-black focus:ring-2 focus:ring-blue-500 outline-none" />
             </div>

             <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Complete address:</label>
               <input type="text" name="complete_address" value={formData.complete_address} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 text-black focus:ring-2 focus:ring-blue-500 outline-none" />
             </div>

             <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg transition duration-200 mt-4 uppercase tracking-wider">
               {loading ? "Submitting..." : "SUBMIT"}
             </button>
           </form>
         )}
      </div>
    </main>
  );
}
