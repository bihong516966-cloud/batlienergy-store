export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  specs: Record<string, string>;
  price: {
    b2b: { min: number; max: number; currency: string };
    retail?: { min: number; max: number; currency: string };
  };
  moq: number;
  images: string[];
  certifications: string[];
  inStock: boolean;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'cylindrical', name: 'Cylindrical Cells (18650/21700)', description: 'Samsung, LG, Molicel, EVE high-drain cells for power tools, e-bikes, and electronics', icon: 'Battery' },
  { id: 'lifepo4', name: 'LiFePO4 Prismatic Cells', description: 'CATL, BYD, EVE prismatic cells for energy storage systems', icon: 'Grid3X3' },
  { id: 'ebike', name: 'E-Bike Batteries', description: '36V-52V battery packs for electric bicycles and scooters', icon: 'Bike' },
  { id: 'tricycle', name: 'Tricycle Batteries', description: '48V-72V battery packs for electric tricycles and rickshaws', icon: 'Truck' },
  { id: 'fpv', name: 'FPV Drone Batteries', description: 'LiPo batteries for FPV freestyle, racing, and cinematic drones', icon: 'Plane' },
  { id: 'powertool', name: 'Power Tool Batteries', description: 'Compatible batteries for Milwaukee, DeWalt, Makita power tools', icon: 'Wrench' },
  { id: 'portable', name: 'Portable Power Stations', description: '300W-3000W portable power stations for outdoor and emergency use', icon: 'Zap' },
  { id: 'large-cylindrical', name: '32650/32700 LiFePO4', description: 'Large cylindrical LiFePO4 cells for solar lighting and storage', icon: 'BatteryCharging' },
  { id: 'lipo', name: 'LiPo Packs', description: 'Polymer lithium batteries for wearables, Bluetooth speakers, RC models', icon: 'Layers' },
  { id: '4680', name: '4680 Large Cylindrical', description: 'Next-gen large format cylindrical cells for EV and energy storage', icon: 'BatteryFull' },
  { id: 'home-storage', name: 'Home Storage Systems', description: 'Complete LiFePO4 battery systems for residential energy storage', icon: 'Home' },
];

export const products: Product[] = [
  // ===== 1. Cylindrical Cells =====
  { id: 'samsung-25r', slug: 'samsung-25r-18650', name: 'Samsung 25R 18650', category: 'cylindrical', description: 'The most popular 18650 cell for power tools and e-bikes. Excellent balance of capacity and discharge rate.', specs: { Capacity: '2500mAh', Voltage: '3.6V', 'Max Discharge': '20A', Chemistry: 'Li-ion NMC', Weight: '47g' }, price: { b2b: { min: 1.0, max: 2.09, currency: 'USD' }, retail: { min: 2.5, max: 4.5, currency: 'USD' } }, moq: 100, images: ['/products/samsung-25r-18650.webp'], certifications: ['UN38.3', 'CE'], inStock: true, badge: 'Best Seller' },
  { id: 'samsung-30q', slug: 'samsung-30q-18650', name: 'Samsung 30Q 18650', category: 'cylindrical', description: 'High-capacity 18650 cell ideal for flashlights, vaping devices, and power banks.', specs: { Capacity: '3000mAh', Voltage: '3.6V', 'Max Discharge': '15A', Chemistry: 'Li-ion NMC', Weight: '48g' }, price: { b2b: { min: 1.5, max: 2.5, currency: 'USD' }, retail: { min: 3.0, max: 5.0, currency: 'USD' } }, moq: 100, images: ['/products/samsung-30q-18650.webp'], certifications: ['UN38.3', 'CE'], inStock: true },
  { id: 'samsung-35e', slug: 'samsung-35e-18650', name: 'Samsung 35E 18650', category: 'cylindrical', description: 'Ultra-high capacity 18650 for laptops, medical devices, and low-drain applications.', specs: { Capacity: '3500mAh', Voltage: '3.6V', 'Max Discharge': '10A', Chemistry: 'Li-ion NMC', Weight: '49g' }, price: { b2b: { min: 1.2, max: 2.2, currency: 'USD' }, retail: { min: 2.8, max: 4.8, currency: 'USD' } }, moq: 100, images: ['/products/samsung-35e-18650.webp'], certifications: ['UN38.3', 'CE'], inStock: true },
  { id: 'samsung-50e', slug: 'samsung-50e-21700', name: 'Samsung 50E 21700', category: 'cylindrical', description: 'High-capacity 21700 cell for EVs, energy storage, and high-performance applications.', specs: { Capacity: '5000mAh', Voltage: '3.6V', 'Max Discharge': '20A', Chemistry: 'Li-ion NMC', Weight: '68g' }, price: { b2b: { min: 1.5, max: 3.0, currency: 'USD' }, retail: { min: 3.5, max: 6.0, currency: 'USD' } }, moq: 50, images: [], certifications: ['UN38.3', 'CE', 'UL'], inStock: true, badge: 'Hot' },
  { id: 'lg-hg2', slug: 'lg-hg2-18650', name: 'LG HG2 18650', category: 'cylindrical', description: 'Reliable high-drain cell for power tools, e-bikes, and high-current applications.', specs: { Capacity: '3000mAh', Voltage: '3.6V', 'Max Discharge': '20A', Chemistry: 'Li-ion NMC', Weight: '47g' }, price: { b2b: { min: 1.14, max: 2.35, currency: 'USD' }, retail: { min: 3.0, max: 5.5, currency: 'USD' } }, moq: 100, images: ['/products/lg-hg2-18650.webp'], certifications: ['UN38.3', 'CE', 'UL'], inStock: true },
  { id: 'molicel-p28a', slug: 'molicel-p28a-18650', name: 'Molicel P28A 18650', category: 'cylindrical', description: 'Ultra-high discharge rate cell for FPV drones, vaping, and demanding applications.', specs: { Capacity: '2800mAh', Voltage: '3.6V', 'Max Discharge': '35A', Chemistry: 'Li-ion NMC', Weight: '46g' }, price: { b2b: { min: 1.8, max: 3.7, currency: 'USD' }, retail: { min: 4.0, max: 7.0, currency: 'USD' } }, moq: 100, images: ['/products/molicel-p28a-18650.webp'], certifications: ['UN38.3', 'CE'], inStock: true },
  { id: 'molicel-p42a', slug: 'molicel-p42a-21700', name: 'Molicel P42A 21700', category: 'cylindrical', description: 'Premium high-discharge 21700 cell for mission-critical and high-reliability OEM applications.', specs: { Capacity: '4200mAh', Voltage: '3.6V', 'Max Discharge': '45A', Chemistry: 'Li-ion NMC', Weight: '67g' }, price: { b2b: { min: 3.5, max: 6.0, currency: 'USD' }, retail: { min: 7.0, max: 12.0, currency: 'USD' } }, moq: 50, images: [], certifications: ['UN38.3', 'CE', 'UL'], inStock: true, badge: 'Top Rated' },

  // ===== 2. LiFePO4 Prismatic =====
  { id: 'lifepo4-100ah', slug: 'lifepo4-100ah-prismatic', name: 'LiFePO4 100Ah Prismatic Cell', category: 'lifepo4', description: 'Compact LiFePO4 cell for small energy storage and solar systems.', specs: { Capacity: '100Ah', Voltage: '3.2V', 'Cycle Life': '3000-6000', Chemistry: 'LiFePO4', Weight: '2.0kg', Dimensions: '207x44x71mm' }, price: { b2b: { min: 25, max: 60, currency: 'USD' } }, moq: 16, images: [], certifications: ['UN38.3', 'CE', 'IEC62619'], inStock: true },
  { id: 'catl-200ah', slug: 'catl-200ah-lifepo4', name: 'CATL 200Ah LiFePO4', category: 'lifepo4', description: 'Medium-capacity prismatic cell for residential and commercial energy storage.', specs: { Capacity: '200Ah', Voltage: '3.2V', 'Cycle Life': '4000-6000', Chemistry: 'LiFePO4', Weight: '3.8kg', Dimensions: '207x44x148mm' }, price: { b2b: { min: 55, max: 120, currency: 'USD' } }, moq: 16, images: [], certifications: ['UN38.3', 'CE', 'UL', 'IEC62619'], inStock: true },
  { id: 'catl-280ah', slug: 'catl-280ah-lifepo4', name: 'CATL 280Ah LiFePO4', category: 'lifepo4', description: 'Industry-standard large prismatic cell for commercial and utility-scale energy storage.', specs: { Capacity: '280Ah', Voltage: '3.2V', 'Cycle Life': '6000-8000', Chemistry: 'LiFePO4', Weight: '5.4kg', Dimensions: '207x44x173mm' }, price: { b2b: { min: 70, max: 130, currency: 'USD' } }, moq: 16, images: [], certifications: ['UN38.3', 'CE', 'UL', 'IEC62619'], inStock: true, badge: 'Hot' },
  { id: 'eve-314ah', slug: 'eve-314ah-lifepo4', name: 'EVE MB31 314Ah LiFePO4', category: 'lifepo4', description: 'Next-generation ultra-high capacity cell for industrial and commercial energy storage.', specs: { Capacity: '314Ah', Voltage: '3.2V', 'Cycle Life': '6000-10000', Chemistry: 'LiFePO4', Weight: '5.6kg', Dimensions: '207x44x173mm' }, price: { b2b: { min: 80, max: 150, currency: 'USD' } }, moq: 16, images: [], certifications: ['UN38.3', 'CE', 'UL', 'IEC62619', 'MSDS'], inStock: true, badge: 'New' },

  // ===== 3. E-Bike Batteries =====
  { id: 'ebike-36v10ah', slug: 'ebike-battery-36v-10ah', name: '36V 10Ah E-Bike Battery', category: 'ebike', description: 'Lightweight e-bike battery for city commuting and leisure riding.', specs: { Capacity: '10Ah', Voltage: '36V', Energy: '360Wh', Chemistry: 'Li-ion', Weight: '2.5kg', Range: '30-40km' }, price: { b2b: { min: 55, max: 100, currency: 'USD' }, retail: { min: 180, max: 280, currency: 'USD' } }, moq: 10, images: [], certifications: ['UN38.3', 'CE'], inStock: true },
  { id: 'ebike-48v15ah', slug: 'ebike-battery-48v-15ah', name: '48V 15Ah E-Bike Battery', category: 'ebike', description: 'Most popular e-bike battery pack. Perfect balance of range and weight.', specs: { Capacity: '15Ah', Voltage: '48V', Energy: '720Wh', Chemistry: 'Li-ion', Weight: '4.2kg', Range: '50-70km' }, price: { b2b: { min: 95, max: 125, currency: 'USD' }, retail: { min: 350, max: 500, currency: 'USD' } }, moq: 10, images: [], certifications: ['UN38.3', 'CE'], inStock: true, badge: 'Best Seller' },
  { id: 'ebike-48v20ah', slug: 'ebike-battery-48v-20ah', name: '48V 20Ah E-Bike Battery', category: 'ebike', description: 'Extended range e-bike battery for long-distance commuting and mountain biking.', specs: { Capacity: '20Ah', Voltage: '48V', Energy: '960Wh', Chemistry: 'Li-ion', Weight: '5.5kg', Range: '70-100km' }, price: { b2b: { min: 150, max: 190, currency: 'USD' }, retail: { min: 450, max: 650, currency: 'USD' } }, moq: 10, images: [], certifications: ['UN38.3', 'CE'], inStock: true },
  { id: 'ebike-52v175ah', slug: 'ebike-battery-52v-175ah', name: '52V 17.5Ah E-Bike Battery', category: 'ebike', description: 'High-performance e-bike battery for speed pedelecs and powerful e-bikes.', specs: { Capacity: '17.5Ah', Voltage: '52V', Energy: '910Wh', Chemistry: 'Li-ion', Weight: '5.0kg', Range: '60-90km' }, price: { b2b: { min: 220, max: 325, currency: 'USD' }, retail: { min: 500, max: 800, currency: 'USD' } }, moq: 5, images: [], certifications: ['UN38.3', 'CE'], inStock: true },

  // ===== 4. Tricycle Batteries =====
  { id: 'trike-48v30ah', slug: 'tricycle-battery-48v-30ah', name: '48V 30Ah Tricycle Battery', category: 'tricycle', description: 'Standard tricycle battery for cargo and passenger electric tricycles.', specs: { Capacity: '30Ah', Voltage: '48V', Energy: '1440Wh', Chemistry: 'Li-ion', Weight: '8kg', Range: '50-70km' }, price: { b2b: { min: 150, max: 250, currency: 'USD' }, retail: { min: 300, max: 500, currency: 'USD' } }, moq: 5, images: [], certifications: ['UN38.3', 'CE'], inStock: true },
  { id: 'trike-60v40ah', slug: 'tricycle-battery-60v-40ah', name: '60V 40Ah Tricycle Battery', category: 'tricycle', description: 'High-capacity battery for heavy-duty electric tricycles and rickshaws.', specs: { Capacity: '40Ah', Voltage: '60V', Energy: '2400Wh', Chemistry: 'Li-ion', Weight: '11kg', Range: '60-90km' }, price: { b2b: { min: 250, max: 400, currency: 'USD' }, retail: { min: 500, max: 800, currency: 'USD' } }, moq: 5, images: [], certifications: ['UN38.3', 'CE'], inStock: true, badge: 'Popular' },
  { id: 'trike-72v50ah', slug: 'tricycle-battery-72v-50ah', name: '72V 50Ah Tricycle Battery', category: 'tricycle', description: 'Premium high-capacity battery for long-range electric tricycles. Top seller in India.', specs: { Capacity: '50Ah', Voltage: '72V', Energy: '3600Wh', Chemistry: 'Li-ion', Weight: '15kg', Range: '80-120km' }, price: { b2b: { min: 400, max: 650, currency: 'USD' }, retail: { min: 800, max: 1500, currency: 'USD' } }, moq: 5, images: [], certifications: ['UN38.3', 'CE'], inStock: true, badge: 'Hot' },

  // ===== 5. FPV Drone Batteries =====
  { id: 'lipo-1s-650', slug: 'lipo-1s-650-fpv', name: '1S 3.7V 650mAh LiPo', category: 'fpv', description: 'Tiny Whoop battery for indoor FPV drones. Ultra-lightweight.', specs: { Capacity: '650mAh', Voltage: '3.7V', 'C-Rate': '80C', Weight: '16g', Chemistry: 'LiPo' }, price: { b2b: { min: 3, max: 8, currency: 'USD' }, retail: { min: 8, max: 15, currency: 'USD' } }, moq: 50, images: [], certifications: [], inStock: true },
  { id: 'lipo-4s-1550', slug: 'lipo-4s-1550-fpv', name: '4S 14.8V 1550mAh LiPo', category: 'fpv', description: 'The most popular FPV freestyle battery. Perfect balance of power and flight time.', specs: { Capacity: '1550mAh', Voltage: '14.8V', 'C-Rate': '100C', Weight: '165g', Chemistry: 'LiPo' }, price: { b2b: { min: 10, max: 18, currency: 'USD' }, retail: { min: 20, max: 35, currency: 'USD' } }, moq: 20, images: [], certifications: [], inStock: true, badge: 'Best Seller' },
  { id: 'lipo-6s-1300', slug: 'lipo-6s-1300-fpv', name: '6S 22.2V 1300mAh LiPo', category: 'fpv', description: 'High-voltage 6S battery for powerful FPV freestyle and racing drones.', specs: { Capacity: '1300mAh', Voltage: '22.2V', 'C-Rate': '130C', Weight: '195g', Chemistry: 'LiPo' }, price: { b2b: { min: 15, max: 28, currency: 'USD' }, retail: { min: 30, max: 55, currency: 'USD' } }, moq: 20, images: [], certifications: [], inStock: true },
  { id: 'lipo-6s-4000', slug: 'lipo-6s-4000-cinematic', name: '6S 22.2V 4000mAh LiPo', category: 'fpv', description: 'High-capacity cinematic FPV battery for long flight times with heavy cameras.', specs: { Capacity: '4000mAh', Voltage: '22.2V', 'C-Rate': '50C', Weight: '520g', Chemistry: 'LiPo' }, price: { b2b: { min: 25, max: 50, currency: 'USD' }, retail: { min: 50, max: 120, currency: 'USD' } }, moq: 10, images: [], certifications: [], inStock: true },

  // ===== 6. Power Tool Batteries =====
  { id: 'milwaukee-m18-5ah', slug: 'milwaukee-m18-5ah', name: 'Milwaukee M18 5.0Ah Compatible', category: 'powertool', description: 'High-capacity replacement battery for Milwaukee M18 power tools.', specs: { Capacity: '5.0Ah', Voltage: '18V', Cells: '5x 18650', Chemistry: 'Li-ion', Weight: '380g' }, price: { b2b: { min: 30, max: 55, currency: 'USD' }, retail: { min: 80, max: 130, currency: 'USD' } }, moq: 20, images: [], certifications: ['UN38.3', 'CE'], inStock: true, badge: 'Best Seller' },
  { id: 'dewalt-20v-5ah', slug: 'dewalt-20v-5ah', name: 'DeWalt 20V Max 5.0Ah Compatible', category: 'powertool', description: 'Premium replacement battery for DeWalt 20V Max power tools.', specs: { Capacity: '5.0Ah', Voltage: '20V', Cells: '5x 18650', Chemistry: 'Li-ion', Weight: '390g' }, price: { b2b: { min: 28, max: 50, currency: 'USD' }, retail: { min: 75, max: 120, currency: 'USD' } }, moq: 20, images: [], certifications: ['UN38.3', 'CE'], inStock: true, badge: 'Popular' },
  { id: 'makita-18v-5ah', slug: 'makita-18v-5ah', name: 'Makita 18V 5.0Ah Compatible', category: 'powertool', description: 'Reliable replacement battery for Makita 18V power tools.', specs: { Capacity: '5.0Ah', Voltage: '18V', Cells: '5x 18650', Chemistry: 'Li-ion', Weight: '370g' }, price: { b2b: { min: 30, max: 55, currency: 'USD' }, retail: { min: 80, max: 130, currency: 'USD' } }, moq: 20, images: [], certifications: ['UN38.3', 'CE'], inStock: true },
  { id: 'generic-18v-5ah', slug: 'generic-18v-5ah-tool', name: 'Universal 18V 5.0Ah Tool Battery', category: 'powertool', description: 'Budget-friendly generic 18V battery compatible with multiple tool brands.', specs: { Capacity: '5.0Ah', Voltage: '18V', Cells: '5x 18650', Chemistry: 'Li-ion', Weight: '380g' }, price: { b2b: { min: 12, max: 25, currency: 'USD' }, retail: { min: 25, max: 50, currency: 'USD' } }, moq: 50, images: [], certifications: ['CE'], inStock: true },

  // ===== 7. Portable Power Stations =====
  { id: 'pps-300w', slug: 'portable-power-station-300w', name: '300W Portable Power Station', category: 'portable', description: 'Compact portable power station for camping, outdoor activities, and emergency backup.', specs: { Capacity: '280Wh', 'AC Output': '300W', 'Peak Power': '600W', Chemistry: 'Li-ion', Weight: '3.5kg', Ports: 'AC/USB-C/USB-A/12V' }, price: { b2b: { min: 80, max: 150, currency: 'USD' }, retail: { min: 150, max: 300, currency: 'USD' } }, moq: 5, images: [], certifications: ['UN38.3', 'CE', 'FCC'], inStock: true },
  { id: 'pps-1000w', slug: 'portable-power-station-1000w', name: '1000W Portable Power Station', category: 'portable', description: 'Mid-range power station for home backup, camping, and outdoor work.', specs: { Capacity: '1008Wh', 'AC Output': '1000W', 'Peak Power': '2000W', Chemistry: 'LiFePO4', Weight: '10.5kg', Ports: 'AC/USB-C/USB-A/12V/Anderson' }, price: { b2b: { min: 200, max: 400, currency: 'USD' }, retail: { min: 450, max: 800, currency: 'USD' } }, moq: 5, images: [], certifications: ['UN38.3', 'CE', 'UL', 'FCC'], inStock: true, badge: 'Popular' },
  { id: 'pps-2000w', slug: 'portable-power-station-2000w', name: '2000W Portable Power Station', category: 'portable', description: 'High-power station for home backup, job sites, and off-grid living.', specs: { Capacity: '2048Wh', 'AC Output': '2000W', 'Peak Power': '4000W', Chemistry: 'LiFePO4', Weight: '22kg', Ports: 'ACx4/USB-Cx2/USB-Ax3/12V/Anderson' }, price: { b2b: { min: 400, max: 700, currency: 'USD' }, retail: { min: 800, max: 1500, currency: 'USD' } }, moq: 3, images: [], certifications: ['UN38.3', 'CE', 'UL', 'FCC'], inStock: true, badge: 'Hot' },

  // ===== 8. 32650/32700 LiFePO4 =====
  { id: '32650-6000', slug: '32650-6000mah-lifepo4', name: '32650 6000mAh LiFePO4', category: 'large-cylindrical', description: 'Large cylindrical LiFePO4 cell for solar street lights and small storage.', specs: { Capacity: '6000mAh', Voltage: '3.2V', 'Cycle Life': '2000-3000', Chemistry: 'LiFePO4', Weight: '145g', Dimensions: '32x65mm' }, price: { b2b: { min: 2.5, max: 6.0, currency: 'USD' }, retail: { min: 5, max: 10, currency: 'USD' } }, moq: 200, images: ['/products/32650-6000mah-lifepo4.webp'], certifications: ['UN38.3', 'CE'], inStock: true },
  { id: '32700-7000', slug: '32700-7000mah-lifepo4', name: '32700 7000mAh LiFePO4', category: 'large-cylindrical', description: 'Ultra-high capacity cylindrical LiFePO4 for solar and storage applications.', specs: { Capacity: '7000mAh', Voltage: '3.2V', 'Cycle Life': '2000-4000', Chemistry: 'LiFePO4', Weight: '170g', Dimensions: '32x70mm' }, price: { b2b: { min: 2.0, max: 5.5, currency: 'USD' }, retail: { min: 4, max: 9, currency: 'USD' } }, moq: 200, images: ['/products/32700-7000mah-lifepo4.webp'], certifications: ['UN38.3', 'CE'], inStock: true, badge: 'Popular' },

  // ===== 9. LiPo Packs =====
  { id: 'lipo-wearable-500', slug: 'lipo-wearable-500mah', name: '3.7V 500mAh Wearable LiPo', category: 'lipo', description: 'Ultra-thin LiPo battery for smartwatches, fitness trackers, and wearables.', specs: { Capacity: '500mAh', Voltage: '3.7V', Dimensions: '30x20x4mm', Weight: '10g', Chemistry: 'LiPo' }, price: { b2b: { min: 0.59, max: 1.5, currency: 'USD' }, retail: { min: 2, max: 5, currency: 'USD' } }, moq: 500, images: [], certifications: ['UN38.3'], inStock: true },
  { id: 'lipo-speaker-3000', slug: 'lipo-speaker-3000mah', name: '3.7V 3000mAh Speaker LiPo', category: 'lipo', description: 'Standard LiPo pack for Bluetooth speakers, power banks, and small devices.', specs: { Capacity: '3000mAh', Voltage: '3.7V', Dimensions: '60x35x6mm', Weight: '60g', Chemistry: 'LiPo' }, price: { b2b: { min: 3.5, max: 7.0, currency: 'USD' }, retail: { min: 8, max: 15, currency: 'USD' } }, moq: 100, images: [], certifications: ['UN38.3', 'CE'], inStock: true },
  { id: 'lipo-2s-2200', slug: 'lipo-2s-2200-rc', name: '2S 7.4V 2200mAh LiPo Pack', category: 'lipo', description: '2S LiPo pack for RC cars, boats, and aircraft models.', specs: { Capacity: '2200mAh', Voltage: '7.4V', 'C-Rate': '40C', Weight: '120g', Chemistry: 'LiPo' }, price: { b2b: { min: 8, max: 15, currency: 'USD' }, retail: { min: 15, max: 30, currency: 'USD' } }, moq: 50, images: [], certifications: [], inStock: true },

  // ===== 10. 4680 =====
  { id: '4680-tesla', slug: '4680-9800mah-ev', name: '4680 9800mAh Cylindrical Cell', category: '4680', description: 'Next-generation large format cylindrical cell for EV and energy storage.', specs: { Capacity: '9800mAh', Voltage: '3.6V', 'Max Discharge': '25A', Chemistry: 'Li-ion NMC', Weight: '340g', Dimensions: '46x80mm' }, price: { b2b: { min: 5.0, max: 12.0, currency: 'USD' } }, moq: 50, images: [], certifications: ['UN38.3', 'CE'], inStock: true, badge: 'New' },

  // ===== 11. Home Storage =====
  { id: 'home-12v100ah', slug: 'home-storage-12v-100ah', name: '12.8V 100Ah LiFePO4 Battery', category: 'home-storage', description: 'Drop-in lead-acid replacement LiFePO4 battery for RV, marine, and solar.', specs: { Capacity: '100Ah', Voltage: '12.8V', Energy: '1280Wh', 'Cycle Life': '3000-6000', Chemistry: 'LiFePO4', Weight: '12kg' }, price: { b2b: { min: 120, max: 220, currency: 'USD' }, retail: { min: 250, max: 450, currency: 'USD' } }, moq: 5, images: [], certifications: ['UN38.3', 'CE', 'UL', 'IEC62619'], inStock: true },
  { id: 'home-48v100ah', slug: 'home-storage-48v-100ah', name: '48V 100Ah LiFePO4 System', category: 'home-storage', description: 'Complete 48V energy storage system for home solar and backup power.', specs: { Capacity: '100Ah', Voltage: '51.2V', Energy: '5120Wh', 'Cycle Life': '4000-6000', Chemistry: 'LiFePO4', Weight: '55kg' }, price: { b2b: { min: 400, max: 800, currency: 'USD' }, retail: { min: 900, max: 2000, currency: 'USD' } }, moq: 2, images: [], certifications: ['UN38.3', 'CE', 'UL', 'IEC62619'], inStock: true, badge: 'Hot' },
  { id: 'home-48v200ah', slug: 'home-storage-48v-200ah', name: '48V 200Ah LiFePO4 System (10kWh)', category: 'home-storage', description: 'Large residential energy storage system. 10kWh capacity for whole-home backup.', specs: { Capacity: '200Ah', Voltage: '51.2V', Energy: '10240Wh', 'Cycle Life': '4000-6000', Chemistry: 'LiFePO4', Weight: '100kg' }, price: { b2b: { min: 1000, max: 2000, currency: 'USD' }, retail: { min: 3000, max: 8000, currency: 'USD' } }, moq: 1, images: [], certifications: ['UN38.3', 'CE', 'UL', 'IEC62619'], inStock: true, badge: 'Premium' },
];

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(p => p.category === categoryId);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.badge);
}
