"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Timestamp } from "firebase/firestore";

type Donor = {
  id: string;
  name: string;
  email: string;
  bloodType: string;
  totalDonations: number;
  lastDonationDate: string;
  eligibleForDonation: boolean;
};

const DonorsPage = () => {
  const [donors, setDonors] = useState<Donor[]>([]);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "blood-center", "blood-center", "donors"),
        );
        const donorList: Donor[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            email: data.email,
            bloodType: data.bloodType,
            totalDonations: data.totalDonations,
            lastDonationDate: data.lastDonationDate
              ? (data.lastDonationDate as Timestamp)
                  .toDate()
                  .toLocaleDateString()
              : "N/A",
            eligibleForDonation: data.eligibleForDonation,
          };
        });

        setDonors(donorList);
      } catch (error) {
        console.error("Error fetching donors: ", error);
      }
    };

    fetchDonors();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4 md:px-20">
      <h1 className="text-2xl font-bold mb-4">Blood Center Donors</h1>
      <div className="w-full">
        {donors.map((donor) => (
          <div key={donor.id} className="border p-4 mb-2 rounded flex md:flex-col">
            <div className="md:grid md:grid-cols-6 md:gap-4">
              <p>Full Name:</p>
              <p>Email:</p>
              <p>Blood Type:</p>
              <p>Total Donations:</p>
              <p>Last Donation Date:</p>
              <p>Eligible for Donation:</p>
            </div>
            <div className="md:grid md:grid-cols-6 font-bold md:gap-4">
              <p>{donor.name}</p>
              <p className="md:text-sm">{donor.email}</p>
              <p>{donor.bloodType}</p>
              <p>{donor.totalDonations}</p>
              <p>{donor.lastDonationDate}</p>
              <p>{donor.eligibleForDonation ? "Yes" : "No"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonorsPage;
