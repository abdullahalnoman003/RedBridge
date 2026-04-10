import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config/index.js';
import { User } from './modules/user/user.model.js';
import { Donor } from './modules/donor/donor.model.js';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load actual Bangladesh locations from JSON file
const locationJsonPath = path.join(__dirname, './data/bangladesh-locations.json');
console.log('📂 Loading locations from:', locationJsonPath);

let locationJsonData;
try {
  const jsonContent = fs.readFileSync(locationJsonPath, 'utf-8');
  // Remove BOM if present
  const cleanContent = jsonContent.replace(/^\uFEFF/, '');
  locationJsonData = JSON.parse(cleanContent);
  console.log('✅ JSON file loaded successfully');
} catch (error) {
  console.error('❌ Error loading JSON file:', error instanceof Error ? error.message : error);
  if (error instanceof Error && error.message.includes('ENOENT')) {
    console.error('   File not found at:', locationJsonPath);
  }
  process.exit(1);
}

// Process JSON to extract divisions, districts, and upazilas
const bangladeshLocations = locationJsonData.divisions.map((division: any) => ({
  division: division.division,
  districts: division.districts.map((district: any) => ({
    name: district.district,
    upazilas: district.upazilla || [],
  })),
}));

// Blood types
const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] as const;
const DONOR_STATUSES = ['pending', 'approved', 'rejected'] as const;

// Realistic Bangladeshi names
const firstNames = [
  'Mohammad', 'Md', 'Ahmed', 'Rahman', 'Hassan', 'Karim', 'Ibrahim', 'Abdullah', 'Farhan', 'Rakib',
  'Imran', 'Arif', 'Nasir', 'Samir', 'Tariq', 'Shoaib', 'Bilal', 'Mithun', 'Ratan', 'Rana',
  'Sajib', 'Robiul', 'Rashid', 'Salman', 'Jamal', 'Saiful', 'Tuhin', 'Naim', 'Rahim', 'Kadir',
];

const lastNames = [
  'Ahmed', 'Khan', 'Hossain', 'Hassan', 'Ali', 'Uddin', 'Rahman', 'Karim', 'Sheikh', 'Roy',
  'Das', 'Saha', 'Ghosh', 'Sarkar', 'Biswas', 'Chatterjee', 'Dey', 'Bhat', 'Singh', 'Nath',
  'Molla', 'Islam', 'Mia', 'Malik', 'Hussain', 'Akter', 'Chowdhury', 'Begum', 'Siddiqui', 'Reza',
];

// Generate realistic Bangladeshi phone numbers
const generatePhoneNumber = (): string => {
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
    console.log('✅ All old data cleared from database');

    // Create users and donors with real Bangladesh location data from JSON
    console.log('\n📊 Seeding data from actual Bangladesh locations...');
    let userIndex = 1;
    let totalUsers = 0;
    let totalDonors = 0;

    const donors: any[] = [];

    // Generate users and donors from actual Bangladesh locations JSON
    for (const division of bangladeshLocations) {
      console.log(`\n📍 Processing Division: ${division.division}`);
      
      for (const district of division.districts) {
        for (const upazila of district.upazilas) {
          // Generate 3-5 donors per upazila for more manageable data
          const donorsPerUpazila = Math.floor(Math.random() * 3) + 3;

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
              availability,
              phone,
              address: `${upazila}, ${district.name}, ${division.division}`,
              photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
              lastLogin: new Date(),
            });

            // Create donor with exact location from JSON
            const donor = new Donor({
              userId: null, // Will be set after user is saved
              bloodType,
              location: {
                division: division.division,
                district: district.name,
                upazila,
                area: `Area ${String(Math.floor(Math.random() * 50)).padStart(2, '0')}`,
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

    // Save all users and donors
    console.log('\n💾 Saving users and donors to database...');
    let savedCount = 0;
    for (const { user, donor } of donors) {
      const savedUser = await user.save();
      donor.userId = savedUser._id;
      await donor.save();
      totalDonors++;
      savedCount++;
      
      if (savedCount % 100 === 0) {
        console.log(`   ✅ Saved ${savedCount} donors...`);
      }
    }

    // Create demo accounts for testing
    console.log('\n🎭 Creating demo accounts...');
    console.log('📌 Note: These accounts require Firebase credentials to login via frontend');
    
    const demoAdminUser = new User({
      name: 'Admin Demo',
      email: 'admin@redbridge.demo',
      role: 'admin',
      isVerified: true,
      phone: '01700000001',
      address: 'Dhaka, Dhaka Sadar, Adabor',
      bio: 'Demo admin account for testing all features',
      availability: true,
      photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin@redbridge.demo',
      lastLogin: new Date(),
    });
    await demoAdminUser.save();
    totalUsers++;

    const demoDonorUser = new User({
      name: 'Donor Demo',
      email: 'donor@redbridge.demo',
      role: 'donor',
      isVerified: true,
      phone: '01700000002',
      address: 'Dhaka, Dhaka Sadar, Adabor',
      bio: 'Demo donor account for testing donor features',
      availability: true,
      photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=donor@redbridge.demo',
      lastLogin: new Date(),
    });
    await demoDonorUser.save();
    totalUsers++;

    // Create donor profile for demo donor
    const demoDonor = new Donor({
      userId: demoDonorUser._id,
      bloodType: 'O+',
      location: {
        division: 'Dhaka',
        district: 'Dhaka',
        upazila: 'Adabor',
        area: 'Demo Area 01',
      },
      phone: '01700000002',
      availability: true,
      status: 'approved',
    });
    await demoDonor.save();
    totalDonors++;

    console.log('✅ Demo accounts created:');
    console.log('   👤 Admin Account:');
    console.log('      Email: admin@redbridge.demo');
    console.log('      Password: Admin@12345');
    console.log('      Role: Admin');
    console.log('   🩸 Donor Account:');
    console.log('      Email: donor@redbridge.demo');
    console.log('      Password: Donor@12345');
    console.log('      Blood Type: O+');
    console.log('      Status: Approved');

    console.log(`\n✅ Seeding completed successfully!`);
    console.log(`📊 Summary:`);
    console.log(`   📝 Total users created: ${totalUsers}`);
    console.log(`   🩸 Total donors created: ${totalDonors}`);
    console.log(`   📍 Divisions covered: ${bangladeshLocations.length}`);

    // Print detailed summary
    console.log('\n📋 Detailed Division Summary:');
    let totalDistricts = 0;
    let totalUpazilas = 0;
    for (const division of bangladeshLocations) {
      const districtCount = division.districts.length;
      const upazilaCount = division.districts.reduce((sum, d) => sum + d.upazilas.length, 0);
      totalDistricts += districtCount;
      totalUpazilas += upazilaCount;
      console.log(`   ✓ ${division.division}: ${districtCount} districts, ${upazilaCount} upazilas`);
    }
    console.log(`\n   Overall: ${totalDistricts} districts, ${totalUpazilas} upazilas in ${bangladeshLocations.length} divisions`);

    console.log('\n⚠️  IMPORTANT: Firebase Setup Required');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('To login with demo accounts, you need to create these users in Firebase:');
    console.log('\n1. Go to Firebase Console → Authentication → Users');
    console.log('2. Create these custom auth users:');
    console.log('\n   Admin Account:');
    console.log('   📧 Email: admin@redbridge.demo');
    console.log('   🔐 Password: Admin@12345');
    console.log('\n   Donor Account:');
    console.log('   📧 Email: donor@redbridge.demo');
    console.log('   🔐 Password: Donor@12345');
    console.log('\n3. Or use Firebase CLI:');
    console.log('   firebase auth:import data.json');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    await mongoose.connection.close();
    console.log('\n✅ Database seeding and connection closed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    try {
      await mongoose.connection.close();
    } catch (closeError) {
      console.error('Error closing connection:', closeError);
    }
    process.exit(1);
  }
};

// Run seed
seedDatabase();
