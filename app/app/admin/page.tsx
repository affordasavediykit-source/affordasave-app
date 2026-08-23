"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ipfjrjntatvbfxxyatre.supabase.co";
const supabaseKey = "sb_publishable_ZImqo6GMlDfRYUy4Fn0vxA_cXOXdX46";
const supabase = createClient(supabaseUrl, supabaseKey);

interface Applicant {
  id: number;
  created_at: string;
  full_name: string;
  tiktok_link: string;
  facebook_link: string;
  shopee_link: string;
  viber_number: string;
  contact_person: string;
  contact_number: string;
  complete_address: string;
  status: string;
}

export default function AdminPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    const { data, error } = await supabase
      .from("applicants")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching applicants:", error);
    } else {
      setApplicants(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: number, newStatus: string) => {
    const { error } = await supabase
      .from("applicants")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      alert("Failed to update status");
    } else {
      fetchApplicants();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-md border-b-4 border-blue-600">
          <div>
            <h1 className="text-3xl font-black text-blue-900 uppercase">Affiliate Admin Dashboard</h1>
            <p className="text-gray-500 text-sm">Manage and review all incoming applications here.</p>
          </div>
          <a href="/" className="mt-4 md:mt-0 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-4 py-2 rounded-xl text-sm transition">
            ← Back to Website
          </a>
        </div>

        {loading ? (
          <div className="text-center py-20 font-bold text-gray-500 text-xl">Loading applicants...</div>
        ) : applicants.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center shadow-md">
            <p className="text-gray-500 text-lg font-medium">Wala pang nag-a-apply sa ngayon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {applicants.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 flex flex-col justify-between">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 mb-4 gap-2">
                  <div>
                    <span className="text-xs text-gray-400 font-semibold">APPLIED AT: {new Date(item.created_at).toLocaleString()}</span>
                    <h2 className="text-2xl font-black text-blue-900">{item.full_name}</h2>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      item.status === 'approved' ? 'bg-green-100 text-green-700' : 
                      item.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      Status: {item.status || 'pending'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-slate-50 p-3 rounded-xl border">
                    <p className="text-xs font-bold text-gray-400 uppercase">TikTok Link</p>
                    <a href={item.tiktok_link?.startsWith('http') ? item.tiktok_link : `https://${item.tiktok_link}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold text-sm hover:underline truncate block">
                      {item.tiktok_link} ↗
                    </a>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border">
                    <p className="text-xs font-bold text-gray-400 uppercase">Facebook Link</p>
                    <a href={item.facebook_link?.startsWith('http') ? item.facebook_link : `https://${item.facebook_link}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold text-sm hover:underline truncate block">
                      {item.facebook_link} ↗
                    </a>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border">
                    <p className="text-xs font-bold text-gray-400 uppercase">Shopee Link</p>
                    <a href={item.shopee_link?.startsWith('http') ? item.shopee_link : `https://${item.shopee_link}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold text-sm hover:underline truncate block">
                      {item.shopee_link} ↗
                    </a>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border">
                    <p className="text-xs font-bold text-gray-400 uppercase">Viber Number</p>
                    <span className="text-green-600 font-bold text-sm block">
                      {item.viber_number} 💬
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-6 flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="text-xs font-bold text-blue-800 uppercase mb-1">Delivery Details</h3>
                    <p className="text-sm text-gray-700"><strong>Contact Person:</strong> {item.contact_person}</p>
                    <p className="text-sm text-gray-700"><strong>Contact Number:</strong> {item.contact_number}</p>
                    <p className="text-sm text-gray-700"><strong>Address:</strong> {item.complete_address}</p>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-2 border-t">
                  <button onClick={() => updateStatus(item.id, 'approved')} className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition">
                    Mark as Approved
                  </button>
                  <button onClick={() => updateStatus(item.id, 'rejected')} className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition">
                    Mark as Rejected
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
