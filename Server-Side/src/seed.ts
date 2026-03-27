import mongoose from 'mongoose';
import { config } from './config/index.js';
import { User } from './modules/user/user.model.js';
import { Donor } from './modules/donor/donor.model.js';

// Real Bangladesh locations data
const bangladeshLocations = [
  {
    division: 'Dhaka',
    districts: [
      { name: 'Dhaka', upazilas: ['Adabor', 'Banani', 'Dakshin Khan', 'Gulshan', 'Motilal', 'Mirpur', 'Paltan', 'Rampura', 'Sabuz Bagh', 'Shahbag', 'Mirpur', 'Kawran Bazar'] },
      { name: 'Gazipur', upazilas: ['Gazipur Sadar', 'Kaliakair', 'Kaliganj', 'Sreepur'] },
      { name: 'Narayanganj', upazilas: ['Narayanganj Sadar', 'Araihazar', 'Bandar', 'Rupganj', 'Sonargaon'] },
      { name: 'Tangail', upazilas: ['Tangail Sadar', 'Basail', 'Bhuapur', 'Delduar', 'Ghatail', 'Gopalpur', 'Madhupur', 'Mirzapur', 'Nagarpur', 'Sakhipur', 'Shakhipur'] },
      { name: 'Manikganj', upazilas: ['Manikganj Sadar', 'Dautipur', 'Ghior', 'Haripur', 'IjharPur', 'Saturia', 'Shivalaya', 'Singair'] },
      { name: 'Munshiganj', upazilas: ['Munshiganj Sadar', 'Gajaria', 'Lohajang', 'Sirajdikhan', 'Sreen', 'Taloja'] },
      { name: 'Rajbari', upazilas: ['Rajbari Sadar', 'Baliakandi', 'Kalukhali', 'Pangsha'] },
      { name: 'Shariatpur', upazilas: ['Shariatpur Sadar', 'Alamdanga', 'Naria', 'Zanjira'] },
      { name: 'Faridpur', upazilas: ['Faridpur Sadar', 'Alfadanga', 'Bhanga', 'Boalmari', 'Char Bhadrasan', 'Madaripur', 'Nagarkanda', 'Sadarpur', 'Saltha'] },
    ]
  },
  {
    division: 'Chittagong',
    districts: [
      { name: 'Chittagong', upazilas: ['Chittagong Sadar', 'Anwara', 'Banshkhali', 'Boalkhali', 'Chandanaish', 'Fatikchhari', 'Guichakgaon', 'Hathazari', 'Khagrachari', 'Karnaphuli', 'Lohagara', 'Mirsharai', 'Patiya', 'Rangunia', 'Raozan', 'Sadarsadar', 'Sandwip', 'Satluria'] },
      { name: 'Cox\'s Bazar', upazilas: ['Cox\'s Bazar Sadar', 'Anchagarh', 'Baharchhara', 'Chakaria', 'Chhimchar Palong', 'Jhilongja', 'Kutubdia', 'Maheshkhali', 'Ramu', 'Teknaf', 'Ukhiya'] },
      { name: 'Bandarban', upazilas: ['Bandarban Sadar', 'Ali Kadam', 'Belainchhari', 'Lama', 'Naikhangchari', 'Rangunia', 'Rowangchhari', 'Ruma', 'Thanchi'] },
      { name: 'Khagrachari', upazilas: ['Khagrachari Sadar', 'Dighinala', 'Lakshmichhari', 'Mahalchhari', 'Matiranga', 'Pankhali', 'Ramgarh'] },
      { name: 'Noakhali', upazilas: ['Noakhali Sadar', 'Begumganj', 'Chatnoaj', 'Companiganj', 'Jalalpur', 'Kabirpur', 'Sudharam', 'Senbag', 'Sonaimuri'] },
      { name: 'Lakshmipur', upazilas: ['Lakshmipur Sadar', 'Sadarpur', 'Kamalnagar', 'Raipur'] },
      { name: 'Cumilla', upazilas: ['Cumilla Sadar', 'Munna Bari', 'Chandpur', 'Chaugachha', 'Daganbhuiya', 'Daudkandi', 'Debidwar', 'Laksam'] },
      { name: 'Chandpur', upazilas: ['Chandpur Sadar', 'Anwara', 'Hajiganj', 'Kachua', 'Laksam', 'Sandwip', 'Shahrasti'] },
    ]
  },
  {
    division: 'Khulna',
    districts: [
      { name: 'Khulna', upazilas: ['Khulna Sadar', 'Batiaghata', 'Dacope', 'Dumuria', 'Koyra', 'Phultala', 'Rupsa', 'Terokhada'] },
      { name: 'Barisal', upazilas: ['Barisal Sadar', 'Agailjhara', 'Babuganj', 'Bakerganj', 'Bhola', 'Gournadi', 'Hizla', 'Mehendiganj', 'Muladi', 'Wazirpur'] },
      { name: 'Jhalokati', upazilas: ['Jhalokati Sadar', 'Haluaghat', 'Jajira', 'Rajaiganj'] },
      { name: 'Pirojpur', upazilas: ['Pirojpur Sadar', 'Bhandaria', 'Indurkani', 'Kawkhali', 'Mathbaria', 'Nazirpur', 'Zianagar'] },
      { name: 'Patuakhali', upazilas: ['Patuakhali Sadar', 'Bauphal', 'Barishal', 'Daulkandi', 'Dumki', 'Galachipa', 'Kalapara', 'Mirzaganj', 'Rangabali'] },
      { name: 'Bhola', upazilas: ['Bhola Sadar', 'Borhanuddin', 'Charfassion', 'Daulkandi', 'Monpura', 'Tazumuddin'] },
      { name: 'Jessore', upazilas: ['Jessore Sadar', 'Abhaynagar', 'Chaugachha', 'Manirampur', 'Sharsha'] },
      { name: 'Magura', upazilas: ['Magura Sadar', 'Nalchity', 'Shalikha', 'Sreepur'] },
      { name: 'Narail', upazilas: ['Narail Sadar', 'Lohagara', 'Pungli'] },
      { name: 'Satkhira', upazilas: ['Satkhira Sadar', 'Assasuni', 'Debhata', 'Kalaroa', 'Kaliganj', 'Rampal', 'Tala'] },
    ]
  },
  {
    division: 'Rajshahi',
    districts: [
      { name: 'Rajshahi', upazilas: ['Rajshahi Sadar', 'Bagha', 'Bagmara', 'Bilkosh', 'Charghat', 'Godagari', 'Mohanpur', 'Paba', 'Puthia', 'Tanore'] },
      { name: 'Natore', upazilas: ['Natore Sadar', 'Bagatipara', 'Baraigram', 'Gurudaspur', 'Lalpur', 'Naugaon', 'Singra'] },
      { name: 'Naogaon', upazilas: ['Naogaon Sadar', 'Atrai', 'Badalgachhi', 'Manda', 'Mohamedpur', 'Naogaon', 'Patnitala', 'Raninagar', 'Sapahar'] },
      { name: 'Chapainawabganj', upazilas: ['Chapainawabganj Sadar', 'Bholahat', 'Gomastapur', 'Shibganj'] },
      { name: 'Bogra', upazilas: ['Bogra Sadar', 'Adamdighi', 'Sherpur', 'Bogra', 'Dhubaura', 'Kahaloo', 'Kajahoriya', 'Nondigram', 'Santahar', 'Sariakandi', 'Sajahanpur', 'Sonatola'] },
      { name: 'Joypurhat', upazilas: ['Joypurhat Sadar', 'Akkelpur', 'Kalijanpur', 'Khatazi', 'Panchbibi'] },
      { name: 'Narayanganj', upazilas: ['Narayanganj Sadar', 'Araihazar', 'Bandar', 'Rupganj', 'Sonargaon'] },
    ]
  },
  {
    division: 'Sylhet',
    districts: [
      { name: 'Sylhet', upazilas: ['Sylhet Sadar', 'Balaganj', 'Beanibazar', 'Companiganj', 'Fenchuganj', 'Golapganj', 'Jaintiapur', 'Kanaighat', 'Korenganj', 'Osmani Nagar'] },
      { name: 'Moulvibazar', upazilas: ['Moulvibazar Sadar', 'Barlekha', 'Juri', 'Kamolganj', 'Kulaura', 'Rajnail', 'Sreemangal'] },
      { name: 'Habiganj', upazilas: ['Habiganj Sadar', 'Ajmiriganj', 'Bahubal', 'Baniachang', 'Chunarughat', 'Lakhai', 'Madhabpur', 'Nabiganj'] },
      { name: 'Sunamganj', upazilas: ['Sunamganj Sadar', 'Bishniganj', 'Chhatak', 'Deoghar', 'Dharmapasha', 'Jagannathpur', 'Jaintiapur', 'Taherpur'] },
    ]
  },
  {
    division: 'Rangpur',
    districts: [
      { name: 'Rangpur', upazilas: ['Rangpur Sadar', 'Badarganj', 'Gangachara', 'Kaunia', 'Lingga', 'Mithapukur', 'Pirganj', 'Taraganj'] },
      { name: 'Dinajpur', upazilas: ['Dinajpur Sadar', 'Biral', 'Birampur', 'Birganj', 'Chirirbandar', 'Fulbari', 'Ghoraghat', 'Kaharole', 'Khansama', 'Naabinagar', 'Parbatipur'] },
      { name: 'Gaibandha', upazilas: ['Gaibandha Sadar', 'Fulchari', 'Gobindaganj', 'Palashbari', 'Sadullapur', 'Saghata', 'Suvaderganj'] },
      { name: 'Tahkhpur', upazilas: ['Takhpur Sadar', 'Baliadangi', 'Tahirpur', 'Sombhuganj'] },
      { name: 'Kurigram', upazilas: ['Kurigram Sadar', 'Bhurungamari', 'Charlakha', 'Dautipur', 'Halti', 'Kurigram', 'Nageshwari', 'Raiganj', 'Rouzan'] },
      { name: 'Lalmonirhat', upazilas: ['Lalmonirhat Sadar', 'Aditmari', 'Hatibandha', 'Kamalpur', 'Patgram'] },
    ]
  },
  {
    division: 'Mymensingh',
    districts: [
      { name: 'Mymensingh', upazilas: ['Mymensingh Sadar', 'Ananda Nagar', 'Aurangabad', 'Bhaluka', 'Dhobaura', 'Gaffargaon', 'Gauripur', 'Haluaghat', 'Ishwarganj', 'Jamalpur', 'Muktagachha', 'Nandail', 'Phulpur'] },
      { name: 'Jamalpur', upazilas: ['Jamalpur Sadar', 'Bakshiganj', 'Dewanganj', 'Islampur', 'Jamalpur Sadar', 'Madarganj', 'Melandah', 'Sarisidi'] },
      { name: 'Sherpur', upazilas: ['Sherpur Sadar', 'Dhupchanchia', 'Jhenaigati', 'Nakla', 'Sherpur', 'Sreebordi'] },
      { name: 'Kishoreganj', upazilas: ['Kishoreganj Sadar', 'Austagram', 'Bajitpur', 'Bhairab', 'Itna', 'Karimganj', 'Katiadi', 'Kishoreganj', 'Kuliarchar', 'Nikli', 'Tarail'] },
    ]
  },
];

// Blood types
const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] as const;
const DONOR_STATUSES = ['pending', 'approved', 'rejected'] as const;

// Realistic Bangladeshi names
const firstNames = [
  'Mohammad', 'Md', 'Ahmed', 'Rahman', 'Hassan', 'Karim', 'Ibrahim', 'Abdullah', 'Farhan', 'Rakib',
  'Imran', 'Arif', 'Nasir', 'Samir', 'Tariq', 'Shoaib', 'Karim', 'Bilal', 'Farah', 'Mithun',
  'Ratan', 'Rana', 'Sajib', 'Robiul', 'Rashid', 'Salman', 'Jamal', 'Saiful', 'Tuhin', 'Saiful',
];

const lastNames = [
  'Ahmed', 'Khan', 'Hossain', 'Hassan', 'Ali', 'Uddin', 'Rahman', 'Karim', 'Sheikh', 'Roy',
  'Das', 'Saha', 'Ghosh', 'Sarkar', 'Biswas', 'Chatterjee', 'Dey', 'Bhat', 'Singh', 'Nath',
];

// Generate realistic Bangladeshi phone numbers
const generatePhoneNumber = (): string => {
  // Format: 01XXXXXXXXX where X is 0-9 (exactly 11 digits total)
  // According to regex: /^(\+?880|0)1[0-9]{9}$/
  // This means: 0 or +880, then 1, then exactly 9 digits = 01XXXXXXXXX
  const nineDigits = String(Math.floor(Math.random() * 1000000000)).padStart(9, '0');
  return `01${nineDigits}`;
};

// Generate realistic email with unique suffix
const generateEmail = (firstName: string, lastName: string, globalIndex: number): string => {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'mail.com', 'protonmail.com'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const randomSuffix = Math.floor(Math.random() * 100000);
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${globalIndex}${randomSuffix}@${domain}`;
};

// Seed function
const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(config.mongodbUri);
    console.log('✅ MongoDB connected');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Donor.deleteMany({});
    console.log('✅ Data cleared');

    // Create users and donors with real Bangladesh location data
    console.log('📊 Seeding data...');
    let userIndex = 1;
    let totalUsers = 0;
    let totalDonors = 0;

    const users = [];
    const donors = [];

    // Generate users and donors from Bangladesh locations
    for (const division of bangladeshLocations) {
      for (const district of division.districts) {
        for (const upazila of district.upazilas) {
          // Generate 5-8 donors per upazila
          const donorsPerUpazila = Math.floor(Math.random() * 4) + 5;

          for (let i = 0; i < donorsPerUpazila; i++) {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const name = `${firstName} ${lastName}`;
            const email = generateEmail(firstName, lastName, userIndex);
            const bloodType = BLOOD_TYPES[Math.floor(Math.random() * BLOOD_TYPES.length)];
            const status = DONOR_STATUSES[Math.floor(Math.random() * DONOR_STATUSES.length)];
            const phone = generatePhoneNumber();
            const availability = Math.random() > 0.3; // 70% available, 30% not available

            // Create user
            const user = new User({
              name,
              email,
              role: 'donor',
              isVerified: true,
              photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
              lastLogin: new Date(),
            });

            users.push(user);

            // Create donor
            const donor = new Donor({
              userId: null, // Will be set after user is saved
              bloodType,
              location: {
                division: division.division, // Get only the division name string
                district: district.name,
                upazila,
                area: `Area ${Math.floor(Math.random() * 100)}`,
              },
              phone,
              availability,
              status,
            });

            donors.push({
              user,
              donor,
            });

            totalUsers++;
            userIndex++;
          }
        }
      }
    }

    // Save users and update donor references
    for (const { user, donor } of donors) {
      const savedUser = await user.save();
      donor.userId = savedUser._id;
      await donor.save();
      totalDonors++;
    }

    console.log(`✅ Seeding completed!`);
    console.log(`📝 Total users created: ${totalUsers}`);
    console.log(`🩸 Total donors created: ${totalDonors}`);
    console.log(`📍 Covered ${bangladeshLocations.length} divisions`);

    // Print summary
    console.log('\n📊 Summary by Division:');
    for (const division of bangladeshLocations) {
      const districtCount = division.districts.length;
      const upazilaCount = division.districts.reduce((sum, d) => sum + d.upazilas.length, 0);
      console.log(`  ${division.division}: ${districtCount} districts, ${upazilaCount} upazilas`);
    }

    await mongoose.connection.close();
    console.log('\n✅ Database seeding successful!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run seed
seedDatabase();
