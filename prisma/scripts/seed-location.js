import { Prisma } from "./conn.js";

const indiaData = {
    States: [
        {
            name: "Andhra Pradesh",
            districts: [
                "Alluri Sitharama Raju",
                "Anakapalli",
                "Ananthapuramu",
                "Annamayya",
                "Bapatla",
                "Chittoor",
                "Dr. B.R. Ambedkar Konaseema",
                "East Godavari",
                "Eluru",
                "Guntur",
                "Kakinada",
                "Krishna",
                "Kurnool",
                "Nandyal",
                "Nellore (Sri Potti Sriramulu Nellore)",
                "NTR",
                "Palnadu",
                "Parvathipuram Manyam",
                "Prakasam",
                "Srikakulam",
                "Sri Sathya Sai",
                "Tirupati",
                "Visakhapatnam",
                "Vizianagaram",
                "West Godavari",
                "YSR Kadapa",
            ],
        },
        {
            name: "Arunachal Pradesh",
            districts: [
                "Anjaw",
                "Capital Complex Itanagar",
                "Changlang",
                "Dibang Valley",
                "East Kameng",
                "East Siang",
                "Kamle",
                "Kra Daadi",
                "Kurung Kumey",
                "Lepa Rada",
                "Lohit",
                "Longding",
                "Lower Dibang Valley",
                "Lower Siang",
                "Lower Subansiri",
                "Namsai",
                "Pakke Kessang",
                "Papum Pare",
                "Shi Yomi",
                "Siang",
                "Tawang",
                "Tirap",
                "Upper Siang",
                "Upper Subansiri",
                "West Kameng",
                "West Siang",
            ],
        },
        {
            name: "Assam",
            districts: [
                "Bajali",
                "Baksa",
                "Barpeta",
                "Biswanath",
                "Bongaigaon",
                "Cachar",
                "Charaideo",
                "Chirang",
                "Darrang",
                "Dhemaji",
                "Dhubri",
                "Dibrugarh",
                "Dima Hasao (North Cachar Hills)",
                "Goalpara",
                "Golaghat",
                "Hailakandi",
                "Hojai",
                "Jorhat",
                "Kamrup",
                "Kamrup Metropolitan",
                "Karbi Anglong",
                "Karimganj",
                "Kokrajhar",
                "Lakhimpur",
                "Majuli",
                "Morigaon",
                "Nagaon",
                "Nalbari",
                "Sivasagar",
                "Sonitpur",
                "South Salmara-Mankachar",
                "Tamulpur",
                "Tinsukia",
                "Udalguri",
                "West Karbi Anglong",
            ],
        },
        {
            name: "Bihar",
            districts: [
                "Araria",
                "Arwal",
                "Aurangabad",
                "Banka",
                "Begusarai",
                "Bhagalpur",
                "Bhojpur",
                "Buxar",
                "Darbhanga",
                "East Champaran (Motihari)",
                "Gaya",
                "Gopalganj",
                "Jamui",
                "Jehanabad",
                "Kaimur (Bhabua)",
                "Katihar",
                "Khagaria",
                "Kishanganj",
                "Lakhisarai",
                "Madhepura",
                "Madhubani",
                "Munger (Monghyr)",
                "Muzaffarpur",
                "Nalanda",
                "Nawada",
                "Patna",
                "Purnia (Purnea)",
                "Rohtas",
                "Saharsa",
                "Samastipur",
                "Saran",
                "Sheikhpura",
                "Sheohar",
                "Sitamarhi",
                "Siwan",
                "Supaul",
                "Vaishali",
                "West Champaran (Bettiah)",
            ],
        },
        {
            name: "Chhattisgarh",
            districts: [
                "Balod",
                "Baloda Bazar",
                "Balrampur-Ramanujganj",
                "Bastar",
                "Bemetara",
                "Bijapur",
                "Bilaspur",
                "Dantewada (South Bastar)",
                "Dhamtari",
                "Durg",
                "Gariaband",
                "Gaurela-Pendra-Marwahi",
                "Janjgir-Champa",
                "Jashpur",
                "Kabirdham (Kawardha)",
                "Kanker (North Bastar)",
                "Khairagarh-Chhuikhadan-Gandai",
                "Kondagaon",
                "Korba",
                "Koriya",
                "Mahasamund",
                "Manendragarh-Chirmiri-Bharatpur",
                "Mohla-Manpur-Chowki",
                "Mungeli",
                "Narayanpur",
                "Raigarh",
                "Raipur",
                "Rajnandgaon",
                "Sarangarh-Bilaigarh",
                "Shakti",
                "Sukma",
                "Surajpur",
                "Surguja",
            ],
        },
        {
            name: "Goa",
            districts: ["North Goa", "South Goa"],
        },
        {
            name: "Gujarat",
            districts: [
                "Ahmedabad",
                "Amreli",
                "Anand",
                "Aravalli",
                "Banaskantha (Palanpur)",
                "Bharuch",
                "Bhavnagar",
                "Botad",
                "Chhota Udepur",
                "Dahod",
                "Dang (Ahwa)",
                "Devbhoomi Dwarka",
                "Gandhinagar",
                "Gir Somnath",
                "Jamnagar",
                "Junagadh",
                "Kachchh",
                "Kheda (Nadiad)",
                "Mahisagar",
                "Mehsana",
                "Morbi",
                "Narmada (Rajpipla)",
                "Navsari",
                "Panchmahal (Godhra)",
                "Patan",
                "Porbandar",
                "Rajkot",
                "Sabarkantha (Himmatnagar)",
                "Surat",
                "Surendranagar",
                "Tapi (Vyara)",
                "Vadodara",
                "Valsad",
            ],
        },
        {
            name: "Haryana",
            districts: [
                "Ambala",
                "Bhiwani",
                "Charkhi Dadri",
                "Faridabad",
                "Fatehabad",
                "Gurugram (Gurgaon)",
                "Hisar",
                "Jhajjar",
                "Jind",
                "Kaithal",
                "Karnal",
                "Kurukshetra",
                "Mahendragarh",
                "Nuh (Mewat)",
                "Palwal",
                "Panchkula",
                "Panipat",
                "Rewari",
                "Rohtak",
                "Sirsa",
                "Sonipat",
                "Yamunanagar",
            ],
        },
        {
            name: "Himachal Pradesh",
            districts: [
                "Bilaspur",
                "Chamba",
                "Hamirpur",
                "Kangra",
                "Kinnaur",
                "Kullu",
                "Lahaul & Spiti",
                "Mandi",
                "Shimla",
                "Sirmaur (Sirmour)",
                "Solan",
                "Una",
            ],
        },
        {
            name: "Jharkhand",
            districts: [
                "Bokaro",
                "Chatra",
                "Deoghar",
                "Dhanbad",
                "Dumka",
                "East Singhbhum",
                "Garhwa",
                "Giridih",
                "Godda",
                "Gumla",
                "Hazaribag",
                "Jamtara",
                "Khunti",
                "Koderma",
                "Latehar",
                "Lohardaga",
                "Pakur",
                "Palamu",
                "Ramgarh",
                "Ranchi",
                "Sahibganj",
                "Seraikela-Kharsawan",
                "Simdega",
                "West Singhbhum",
            ],
        },
        {
            name: "Karnataka",
            districts: [
                "Bagalkot",
                "Ballari (Bellary)",
                "Belagavi (Belgaum)",
                "Bengaluru Rural",
                "Bengaluru Urban",
                "Bidar",
                "Chamarajanagar",
                "Chikballapur",
                "Chikkamagaluru (Chikmagalur)",
                "Chitradurga",
                "Dakshina Kannada",
                "Davanagere",
                "Dharwad",
                "Gadag",
                "Hassan",
                "Haveri",
                "Kalaburagi (Gulbarga)",
                "Kodagu",
                "Kolar",
                "Koppal",
                "Mandya",
                "Mysuru (Mysore)",
                "Raichur",
                "Ramanagara",
                "Shivamogga (Shimoga)",
                "Tumakuru (Tumkur)",
                "Udupi",
                "Uttara Kannada (Karwar)",
                "Vijayanagara",
                "Vijayapura (Bijapur)",
                "Yadgir",
            ],
        },
        {
            name: "Kerala",
            districts: [
                "Alappuzha",
                "Ernakulam",
                "Idukki",
                "Kannur",
                "Kasaragod",
                "Kollam",
                "Kottayam",
                "Kozhikode",
                "Malappuram",
                "Palakkad",
                "Pathanamthitta",
                "Thiruvananthapuram",
                "Thrissur",
                "Wayanad",
            ],
        },
        {
            name: "Madhya Pradesh",
            districts: [
                "Agar Malwa",
                "Alirajpur",
                "Anuppur",
                "Ashoknagar",
                "Balaghat",
                "Barwani",
                "Betul",
                "Bhind",
                "Bhopal",
                "Burhanpur",
                "Chachaura-Binaganj",
                "Chhatarpur",
                "Chhindwara",
                "Damoh",
                "Datia",
                "Dewas",
                "Dhar",
                "Dindori",
                "Guna",
                "Gwalior",
                "Harda",
                "Hoshangabad (Narmadapuram)",
                "Indore",
                "Jabalpur",
                "Jhabua",
                "Katni",
                "Khandwa (East Nimar)",
                "Khargone (West Nimar)",
                "Maihar",
                "Mandla",
                "Mandsaur",
                "Mauganj",
                "Morena",
                "Narsinghpur",
                "Neemuch",
                "Niwari",
                "Panna",
                "Pandhurna",
                "Raisen",
                "Rajgarh",
                "Ratlam",
                "Rewa",
                "Sagar",
                "Satna",
                "Sehore",
                "Seoni",
                "Shahdol",
                "Shajapur",
                "Sheopur",
                "Shivpuri",
                "Sidhi",
                "Singrauli",
                "Tikamgarh",
                "Ujjain",
                "Umaria",
                "Vidisha",
            ],
        },
        {
            name: "Maharashtra",
            districts: [
                "Ahmednagar",
                "Akola",
                "Amravati",
                "Aurangabad (Chhatrapati Sambhaji Nagar)",
                "Beed",
                "Bhandara",
                "Buldhana",
                "Chandrapur",
                "Dhule",
                "Gadchiroli",
                "Gondia",
                "Hingoli",
                "Jalgaon",
                "Jalna",
                "Kolhapur",
                "Latur",
                "Mumbai City",
                "Mumbai Suburban",
                "Nagpur",
                "Nanded",
                "Nandurbar",
                "Nashik",
                "Osmanabad (Dharashiv)",
                "Palghar",
                "Parbhani",
                "Pune",
                "Raigad",
                "Ratnagiri",
                "Sangli",
                "Satara",
                "Sindhudurg",
                "Solapur",
                "Thane",
                "Wardha",
                "Washim",
                "Yavatmal",
            ],
        },
        {
            name: "Manipur",
            districts: [
                "Bishnupur",
                "Chandel",
                "Churachandpur",
                "Imphal East",
                "Imphal West",
                "Jiribam",
                "Kakching",
                "Kamjong",
                "Kangpokpi",
                "Noney",
                "Pherzawl",
                "Senapati",
                "Tamenglong",
                "Tengnoupal",
                "Thoubal",
                "Ukhrul",
            ],
        },
        {
            name: "Meghalaya",
            districts: [
                "East Garo Hills",
                "East Jaintia Hills",
                "East Khasi Hills",
                "Eastern West Khasi Hills",
                "North Garo Hills",
                "Ri Bhoi",
                "South Garo Hills",
                "South West Garo Hills",
                "South West Khasi Hills",
                "West Garo Hills",
                "West Jaintia Hills",
                "West Khasi Hills",
            ],
        },
        {
            name: "Mizoram",
            districts: [
                "Aizawl",
                "Champhai",
                "Hnahthial",
                "Khawzawl",
                "Kolasib",
                "Lawngtlai",
                "Lunglei",
                "Mamit",
                "Saiha",
                "Saitual",
                "Serchhip",
            ],
        },
        {
            name: "Nagaland",
            districts: [
                "Chümoukedima",
                "Dimapur",
                "Kiphire",
                "Kohima",
                "Longleng",
                "Mokokchung",
                "Mon",
                "Niuland",
                "Noklak",
                "Peren",
                "Phek",
                "Shamator",
                "Tseminyü",
                "Tuensang",
                "Wokha",
                "Zünheboto",
            ],
        },
        {
            name: "Odisha",
            districts: [
                "Angul",
                "Balangir",
                "Balasore (Baleswar)",
                "Bargarh",
                "Bhadrak",
                "Boudh (Baudh)",
                "Cuttack",
                "Deogarh (Debagarh)",
                "Dhenkanal",
                "Gajapati",
                "Ganjam",
                "Jagatsinghpur",
                "Jajpur",
                "Jharsuguda",
                "Kalahandi",
                "Kandhamal",
                "Kendrapara",
                "Kendujhar (Keonjhar)",
                "Khordha",
                "Koraput",
                "Malkangiri",
                "Mayurbhanj",
                "Nabarangpur",
                "Nayagarh",
                "Nuapada",
                "Puri",
                "Rayagada",
                "Sambalpur",
                "Subarnapur (Sonepur)",
                "Sundargarh",
            ],
        },
        {
            name: "Punjab",
            districts: [
                "Amritsar",
                "Barnala",
                "Bathinda",
                "Faridkot",
                "Fatehgarh Sahib",
                "Fazilka",
                "Ferozepur",
                "Gurdaspur",
                "Hoshiarpur",
                "Jalandhar",
                "Kapurthala",
                "Ludhiana",
                "Malerkotla",
                "Mansa",
                "Moga",
                "Muktsar (Sri Muktsar Sahib)",
                "Pathankot",
                "Patiala",
                "Rupnagar (Ropar)",
                "Sahibzada Ajit Singh Nagar (Mohali)",
                "Sangrur",
                "Shahid Bhagat Singh Nagar (Nawanshahr)",
                "Tarn Taran",
            ],
        },
        {
            name: "Rajasthan",
            districts: [
                "Ajmer",
                "Alwar",
                "Anupgarh",
                "Balotra",
                "Banswara",
                "Baran",
                "Barmer",
                "Beawar",
                "Bharatpur",
                "Bhilwara",
                "Bikaner",
                "Bundi",
                "Chittorgarh",
                "Churu",
                "Dausa",
                "Deeg",
                "Dholpur",
                "Didwana-Kuchaman",
                "Dudu",
                "Dungarpur",
                "Ganganagar (Sri Ganganagar)",
                "Gangapur City",
                "Hanumangarh",
                "Jaipur",
                "Jaipur Rural",
                "Jaisalmer",
                "Jalore",
                "Jhalawar",
                "Jhunjhunu",
                "Jodhpur",
                "Jodhpur Rural",
                "Karauli",
                "Kekri",
                "Khairthal-Tijara",
                "Kota",
                "Kotputli-Behror",
                "Nagaur",
                "Pali",
                "Phalodi",
                "Pratapgarh",
                "Rajsamand",
                "Salumbar",
                "Sanchore",
                "Sawai Madhopur",
                "Shahpura",
                "Sikar",
                "Sirohi",
                "Tonk",
                "Udaipur",
            ],
        },
        {
            name: "Sikkim",
            districts: [
                "Gangtok",
                "Gyalshing (West Sikkim)",
                "Mangan (North Sikkim)",
                "Namchi (South Sikkim)",
                "Pakyong",
                "Soreng",
            ],
        },
        {
            name: "Tamil Nadu",
            districts: [
                "Ariyalur",
                "Chengalpattu",
                "Chennai",
                "Coimbatore",
                "Cuddalore",
                "Dharmapuri",
                "Dindigul",
                "Erode",
                "Kallakurichi",
                "Kanchipuram",
                "Kanyakumari",
                "Karur",
                "Krishnagiri",
                "Madurai",
                "Mayiladuthurai",
                "Nagapattinam",
                "Namakkal",
                "Nilgiris",
                "Perambalur",
                "Pudukkottai",
                "Ramanathapuram",
                "Ranipet",
                "Salem",
                "Sivaganga",
                "Tenkasi",
                "Thanjavur",
                "Theni",
                "Thoothukudi (Tuticorin)",
                "Tiruchirappalli (Trichy)",
                "Tirunelveli",
                "Tirupathur",
                "Tiruppur",
                "Tiruvallur",
                "Tiruvannamalai",
                "Tiruvarur",
                "Vellore",
                "Viluppuram",
                "Virudhunagar",
            ],
        },
        {
            name: "Telangana",
            districts: [
                "Adilabad",
                "Bhadradri Kothagudem",
                "Hyderabad",
                "Jagtial",
                "Jangaon",
                "Jayashankar Bhupalpally",
                "Jogulamba Gadwal",
                "Kamareddy",
                "Karimnagar",
                "Khammam",
                "Komaram Bheem Asifabad",
                "Mahabubabad",
                "Mahabubnagar",
                "Mancherial",
                "Medak",
                "Medchal–Malkajgiri",
                "Mulugu",
                "Nagarkurnool",
                "Nalgonda",
                "Narayanpet",
                "Nirmal",
                "Nizamabad",
                "Peddapalli",
                "Rajanna Sircilla",
                "Ranga Reddy",
                "Sangareddy",
                "Siddipet",
                "Suryapet",
                "Vikarabad",
                "Wanaparthy",
                "Warangal",
                "Hanamkonda",
                "Yadadri Bhuvanagiri",
            ],
        },
        {
            name: "Tripura",
            districts: [
                "Dhalai",
                "Gomati",
                "Khowai",
                "North Tripura",
                "Sepahijala",
                "South Tripura",
                "Unakoti",
                "West Tripura",
            ],
        },
        {
            name: "Uttar Pradesh",
            districts: [
                "Agra",
                "Aligarh",
                "Ambedkar Nagar",
                "Amethi (Chatrapati Sahuji Maharaj Nagar)",
                "Amroha (J.P. Nagar)",
                "Auraiya",
                "Ayodhya (Faizabad)",
                "Azamgarh",
                "Baghpat",
                "Bahraich",
                "Ballia",
                "Balrampur",
                "Banda",
                "Barabanki",
                "Bareilly",
                "Basti",
                "Bhadohi",
                "Bijnor",
                "Budaun",
                "Bulandshahr",
                "Chandauli",
                "Chitrakoot",
                "Deoria",
                "Etah",
                "Etawah",
                "Farrukhabad",
                "Fatehpur",
                "Firozabad",
                "Gautam Buddh Nagar",
                "Ghaziabad",
                "Ghazipur",
                "Gonda",
                "Gorakhpur",
                "Hamirpur",
                "Hapur (Panchsheel Nagar)",
                "Hardoi",
                "Hathras (Mahamaya Nagar)",
                "Jalaun",
                "Jaunpur",
                "Jhansi",
                "Kannauj",
                "Kanpur Dehat (Ramabai Nagar)",
                "Kanpur Nagar",
                "Kasganj (Kanshiram Nagar)",
                "Kaushambi",
                "Kheri (Lakhimpur Kheri)",
                "Kushinagar (Padrauna)",
                "Lalitpur",
                "Lucknow",
                "Maharajganj",
                "Mahoba",
                "Mainpuri",
                "Mathura",
                "Mau",
                "Meerut",
                "Mirzapur",
                "Moradabad",
                "Muzaffarnagar",
                "Pilibhit",
                "Pratapgarh",
                "Prayagraj (Allahabad)",
                "Raebareli",
                "Rampur",
                "Saharanpur",
                "Sambhal (Bhim Nagar)",
                "Sant Kabir Nagar",
                "Shahjahanpur",
                "Shamli (Prabuddh Nagar)",
                "Shravasti",
                "Siddharthnagar",
                "Sitapur",
                "Sonbhadra",
                "Sultanpur",
                "Unnao",
                "Varanasi",
            ],
        },
        {
            name: "Uttarakhand",
            districts: [
                "Almora",
                "Bageshwar",
                "Chamoli",
                "Champawat",
                "Dehradun",
                "Haridwar",
                "Nainital",
                "Pauri Garhwal",
                "Pithoragarh",
                "Rudraprayag",
                "Tehri Garhwal",
                "Udham Singh Nagar",
                "Uttarkashi",
            ],
        },
        {
            name: "West Bengal",
            districts: [
                "Alipurduar",
                "Bankura",
                "Birbhum",
                "Cooch Behar",
                "Dakshin Dinajpur (South Dinajpur)",
                "Darjeeling",
                "Hooghly",
                "Howrah",
                "Jalpaiguri",
                "Jhargram",
                "Kalimpong",
                "Kolkata",
                "Malda",
                "Murshidabad",
                "Nadia",
                "North 24 Parganas",
                "Paschim Bardhaman (West Burdwan)",
                "Paschim Medinipur (West Midnapore)",
                "Purba Bardhaman (East Burdwan)",
                "Purba Medinipur (East Midnapore)",
                "Purulia",
                "South 24 Parganas",
                "Uttar Dinajpur (North Dinajpur)",
            ],
        },
    ],
    "Union Territories": [
        {
            name: "Andaman and Nicobar Islands",
            districts: ["Nicobar", "North and Middle Andaman", "South Andaman"],
        },
        {
            name: "Chandigarh",
            districts: ["Chandigarh"],
        },
        {
            name: "Dadra and Nagar Haveli and Daman and Diu",
            districts: ["Dadra and Nagar Haveli", "Daman", "Diu"],
        },
        {
            name: "Delhi (National Capital Territory of Delhi)",
            districts: [
                "Central Delhi",
                "East Delhi",
                "New Delhi",
                "North Delhi",
                "North East Delhi",
                "North West Delhi",
                "Shahdara",
                "South Delhi",
                "South East Delhi",
                "South West Delhi",
                "West Delhi",
            ],
        },
        {
            name: "Jammu and Kashmir",
            districts: [
                "Anantnag",
                "Bandipora",
                "Baramulla",
                "Budgam",
                "Doda",
                "Ganderbal",
                "Jammu",
                "Kathua",
                "Kishtwar",
                "Kulgam",
                "Kupwara",
                "Poonch",
                "Pulwama",
                "Rajouri",
                "Ramban",
                "Reasi",
                "Samba",
                "Shopian",
                "Srinagar",
                "Udhampur",
            ],
        },
        {
            name: "Ladakh",
            districts: ["Kargil", "Leh"],
        },
        {
            name: "Lakshadweep",
            districts: ["Lakshadweep"],
        },
        {
            name: "Puducherry",
            districts: ["Karaikal", "Mahé", "Puducherry", "Yanam"],
        },
    ],
};

export async function seedLocationWithTransaction() {
    console.log("Starting database seeding with transaction...");
    const countryId = 1; // Country ID for India as specified

    try {
        // Execute everything in a transaction for atomicity
        await Prisma.$transaction(
            async (tx) => {
                console.log(
                    `Verifying Country with ID: ${countryId} exists...`,
                );
                // Check if country exists
                const india = await tx.country.findUnique({
                    where: { id: countryId },
                });

                if (!india) {
                    console.log(
                        `Country with ID ${countryId} not found. Creating India...`,
                    );
                    await tx.country.create({
                        data: {
                            name: "India",
                            // id will be automatically generated by PostgreSQL
                        },
                    });
                    console.log("Created country: India");
                } else {
                    console.log(`Found existing country: ${india.name}`);
                }

                // Combine States and Union Territories
                const allRegions = [
                    ...indiaData.States,
                    ...indiaData["Union Territories"],
                ];
                console.log(
                    `Processing ${allRegions.length} regions (states and union territories)...`,
                );

                // Process each region and its districts in batches to avoid memory issues
                let totalStatesCreated = 0;
                let totalCitiesCreated = 0;

                // Process in smaller batches if needed for very large datasets
                const BATCH_SIZE = 10; // Adjust based on your data size and database performance

                for (let i = 0; i < allRegions.length; i += BATCH_SIZE) {
                    const batch = allRegions.slice(i, i + BATCH_SIZE);
                    console.log(
                        `Processing batch ${i / BATCH_SIZE + 1}/${Math.ceil(allRegions.length / BATCH_SIZE)}`,
                    );

                    // Process each state in the current batch
                    for (const region of batch) {
                        // Check if the state already exists to avoid duplicates
                        const existingState = await tx.state.findFirst({
                            where: {
                                name: region.name,
                                countryId: countryId,
                            },
                        });

                        let stateId;

                        if (existingState) {
                            console.log(
                                `State "${region.name}" already exists with ID: ${existingState.id}`,
                            );
                            stateId = existingState.id;
                        } else {
                            // Create the state
                            const newState = await tx.state.create({
                                data: {
                                    name: region.name,
                                    countryId: countryId,
                                },
                            });
                            stateId = newState.id;
                            totalStatesCreated++;
                            console.log(
                                `Created state: ${region.name} with ID: ${stateId}`,
                            );
                        }

                        // Prepare city data for this state
                        const cityData = region.districts.map((district) => ({
                            name: district,
                            stateId: stateId,
                        }));

                        // Skip existing cities to avoid duplicates
                        // First check existing cities for this state
                        const existingCities = await tx.city.findMany({
                            where: { stateId: stateId },
                            select: { name: true },
                        });

                        const existingCityNames = new Set(
                            existingCities.map((city) => city.name),
                        );

                        // Filter out cities that already exist
                        const citiesToCreate = cityData.filter(
                            (city) => !existingCityNames.has(city.name),
                        );

                        if (citiesToCreate.length > 0) {
                            // Bulk create cities for this state
                            const result = await tx.city.createMany({
                                data: citiesToCreate,
                                skipDuplicates: true,
                            });

                            totalCitiesCreated += result.count;
                            console.log(
                                `Created ${result.count} cities for state: ${region.name}`,
                            );
                        } else {
                            console.log(
                                `No new cities to create for state: ${region.name}`,
                            );
                        }
                    }
                }

                console.log(
                    `Transaction complete. Created ${totalStatesCreated} new states and ${totalCitiesCreated} new cities.`,
                );
            },
            {
                // Transaction options - adjust timeout based on data size
                timeout: 60000, // 60 seconds timeout for large operations
                maxWait: 10000, // maximum time to wait for transaction to start
                isolationLevel: "Serializable", // highest isolation level for data integrity
            },
        );

        console.log("Database seeding completed successfully!");
    } catch (error) {
        console.error("Error during database seeding transaction:", error);
        throw error; // Re-throw to handle at the caller level if needed
    }
}

// For even better performance with very large datasets, consider this alternative chunked approach
export async function seedDatabaseWithChunkedTransactions() {
    console.log("Starting database seeding with chunked transactions...");
    const countryId = 1; // Country ID for India as specified

    try {
        // First verify/create the country outside of state/city transactions
        console.log(`Verifying Country with ID: ${countryId} exists...`);
        const india = await Prisma.country.findUnique({
            where: { id: countryId },
        });

        if (!india) {
            console.log(
                `Country with ID ${countryId} not found. Creating India...`,
            );
            await Prisma.country.create({
                data: {
                    name: "India",
                    // id will be automatically generated by PostgreSQL
                },
            });
            console.log("Created country: India");
        } else {
            console.log(`Found existing country: ${india.name}`);
        }

        // Combine States and Union Territories
        const allRegions = [
            ...indiaData.States,
            ...indiaData["Union Territories"],
        ];
        console.log(
            `Processing ${allRegions.length} regions in chunked transactions...`,
        );

        let totalStatesCreated = 0;
        let totalCitiesCreated = 0;

        // Process states in chunks of 5 for better transaction management
        const STATE_CHUNK_SIZE = 5;

        for (let i = 0; i < allRegions.length; i += STATE_CHUNK_SIZE) {
            const regionChunk = allRegions.slice(i, i + STATE_CHUNK_SIZE);
            console.log(
                `Processing region chunk ${Math.floor(i / STATE_CHUNK_SIZE) + 1}/${Math.ceil(allRegions.length / STATE_CHUNK_SIZE)}`,
            );

            // Use a transaction for each chunk of states
            await Prisma.$transaction(
                async (tx) => {
                    for (const region of regionChunk) {
                        // Check if state exists
                        const existingState = await tx.state.findFirst({
                            where: {
                                name: region.name,
                                countryId: countryId,
                            },
                        });

                        let stateId;

                        if (existingState) {
                            stateId = existingState.id;
                            console.log(
                                `Using existing state: ${region.name} (ID: ${stateId})`,
                            );
                        } else {
                            // Create the state
                            const newState = await tx.state.create({
                                data: {
                                    name: region.name,
                                    countryId: countryId,
                                },
                            });
                            stateId = newState.id;
                            totalStatesCreated++;
                            console.log(
                                `Created state: ${region.name} (ID: ${stateId})`,
                            );
                        }

                        // Get existing cities to avoid duplicates
                        const existingCities = await tx.city.findMany({
                            where: { stateId: stateId },
                            select: { name: true },
                        });

                        const existingCityNames = new Set(
                            existingCities.map((city) => city.name),
                        );

                        // Prepare city data that doesn't already exist
                        const citiesToCreate = region.districts
                            .filter(
                                (district) => !existingCityNames.has(district),
                            )
                            .map((district) => ({
                                name: district,
                                stateId: stateId,
                            }));

                        if (citiesToCreate.length > 0) {
                            // Batch create cities
                            const result = await tx.city.createMany({
                                data: citiesToCreate,
                                skipDuplicates: true,
                            });

                            totalCitiesCreated += result.count;
                            console.log(
                                `Created ${result.count} cities for state: ${region.name}`,
                            );
                        } else {
                            console.log(
                                `All cities already exist for state: ${region.name}`,
                            );
                        }
                    }
                },
                {
                    timeout: 30000, // 30 seconds timeout per chunk
                    maxWait: 5000,
                    isolationLevel: "Serializable",
                },
            );
        }

        console.log(
            `Seeding complete! Created ${totalStatesCreated} new states and ${totalCitiesCreated} new cities.`,
        );
    } catch (error) {
        console.error("Error during chunked transaction seeding:", error);
        throw error;
    }
}

// Choose which implementation to use based on your dataset size
// For medium datasets:
// seedLocationWithTransaction().catch((error) => {
//     console.error("Seeding failed:", error);
//     process.exit(1);
// });

// For very large datasets, uncomment this instead:
// seedDatabaseWithChunkedTransactions()
//   .catch(error => {
//     console.error('Seeding failed:', error);
//     process.exit(1);
//   });
