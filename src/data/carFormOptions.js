// Довідники та функції для форм

// Марки та моделі автомобілів
export const carBrands = [
  { id: 1, name: 'Acura', models: ['ILX', 'MDX', 'NSX', 'RDX', 'RLX', 'TLX'] },
  { id: 2, name: 'Alfa Romeo', models: ['4C', 'Giulia', 'Stelvio'] },
  { id: 3, name: 'Aston Martin', models: ['DB11', 'DBX', 'DBS', 'Rapide', 'Vantage'] },
  { id: 4, name: 'Audi', models: ['A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'e-tron', 'Q3', 'Q5', 'Q7', 'Q8', 'R8', 'RS', 'S', 'TT'] },
  { id: 5, name: 'Bentley', models: ['Bentayga', 'Continental GT', 'Flying Spur', 'Mulsanne'] },
  { id: 6, name: 'BMW', models: ['2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', '8 Series', 'i3', 'i8', 'M', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4'] },
  { id: 7, name: 'Buick', models: ['Cascada', 'Enclave', 'Encore', 'Envision', 'LaCrosse', 'Regal'] },
  { id: 8, name: 'Cadillac', models: ['ATS', 'CT4', 'CT5', 'CT6', 'Escalade', 'SRX', 'XT4', 'XT5', 'XT6'] },
  { id: 9, name: 'Chevrolet', models: ['Blazer', 'Bolt', 'Camaro', 'Colorado', 'Corvette', 'Cruze', 'Equinox', 'Express', 'Impala', 'Malibu', 'Silverado', 'Sonic', 'Spark', 'Suburban', 'Tahoe', 'Trailblazer', 'Traverse', 'Trax'] },
  { id: 10, name: 'Chrysler', models: ['300', 'Pacifica', 'Voyager'] },
  { id: 11, name: 'Dodge', models: ['Challenger', 'Charger', 'Durango', 'Grand Caravan', 'Journey'] },
  { id: 12, name: 'Ferrari', models: ['488', '812', 'F8', 'GTC4Lusso', 'Portofino', 'SF90 Stradale'] },
  { id: 13, name: 'Fiat', models: ['124 Spider', '500', '500L', '500X'] },
  { id: 14, name: 'Ford', models: ['EcoSport', 'Edge', 'Escape', 'Expedition', 'Explorer', 'F-150', 'F-250', 'F-350', 'F-450', 'F-550', 'F-650', 'F-750', 'Fiesta', 'Flex', 'Focus', 'Fusion', 'GT', 'Mustang', 'Ranger', 'Super Duty', 'Taurus', 'Transit'] },
  { id: 15, name: 'Genesis', models: ['G70', 'G80', 'G90'] },
  { id: 16, name: 'GMC', models: ['Acadia', 'Canyon', 'Savana', 'Sierra', 'Terrain', 'Yukon'] },
  { id: 17, name: 'Honda', models: ['Accord', 'Civic', 'Clarity', 'CR-V', 'Fit', 'HR-V', 'Insight', 'Odyssey', 'Passport', 'Pilot', 'Ridgeline'] },
  { id: 18, name: 'Hyundai', models: ['Accent', 'Elantra', 'Ioniq', 'Kona', 'Nexo', 'Palisade', 'Santa Fe', 'Sonata', 'Tucson', 'Veloster', 'Venue'] },
  { id: 19, name: 'Infiniti', models: ['Q50', 'Q60', 'Q70', 'QX30', 'QX50', 'QX60', 'QX80'] },
  { id: 20, name: 'Jaguar', models: ['E-Pace', 'F-Pace', 'F-Type', 'I-Pace', 'XE', 'XF', 'XJ'] },
  { id: 21, name: 'Jeep', models: ['Cherokee', 'Compass', 'Gladiator', 'Grand Cherokee', 'Renegade', 'Wrangler'] },
  { id: 22, name: 'Kia', models: ['Cadenza', 'Forte', 'K900', 'Niro', 'Optima', 'Rio', 'Sedona', 'Sorento', 'Soul', 'Sportage', 'Stinger', 'Telluride'] },
  { id: 23, name: 'Lamborghini', models: ['Aventador', 'Huracan', 'Urus'] },
  { id: 24, name: 'Land Rover', models: ['Defender', 'Discovery', 'Discovery Sport', 'Range Rover', 'Range Rover Evoque', 'Range Rover Sport', 'Range Rover Velar'] },
  { id: 25, name: 'Lexus', models: ['ES', 'GS', 'GX', 'IS', 'LC', 'LS', 'LX', 'NX', 'RC', 'RX', 'UX'] },
  { id: 26, name: 'Lincoln', models: ['Aviator', 'Continental', 'Corsair', 'MKC', 'MKT', 'MKX', 'MKZ', 'Nautilus', 'Navigator'] },
  { id: 27, name: 'Lotus', models: ['Evora', 'Exige'] },
  { id: 28, name: 'Maserati', models: ['Ghibli', 'GranTurismo', 'Levante', 'Quattroporte'] },
  { id: 29, name: 'Mazda', models: ['CX-3', 'CX-30', 'CX-5', 'CX-9', 'Mazda3', 'Mazda6', 'MX-5 Miata'] },
  { id: 30, name: 'McLaren', models: ['570S', '600LT', '720S', 'GT'] },
  { id: 31, name: 'Mercedes-Benz', models: ['A-Class', 'B-Class', 'C-Class', 'CLA', 'CLS', 'E-Class', 'G-Class', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'GT', 'S-Class', 'SL', 'SLC', 'Sprinter'] },
  { id: 32, name: 'Mini', models: ['Clubman', 'Countryman', 'Hardtop', 'Paceman'] },
  { id: 33, name: 'Mitsubishi', models: ['Eclipse Cross', 'Mirage', 'Outlander', 'Outlander Sport'] },
  { id: 34, name: 'Nissan', models: ['370Z', 'Altima', 'Armada', 'Frontier', 'GT-R', 'Kicks', 'Leaf', 'Maxima', 'Murano', 'NV', 'NV200', 'Pathfinder', 'Rogue', 'Rogue Sport', 'Sentra', 'Titan', 'Versa'] },
  { id: 35, name: 'Porsche', models: ['718', '911', 'Cayenne', 'Macan', 'Panamera', 'Taycan'] },
  { id: 36, name: 'Ram', models: ['1500', '2500', '3500', 'ProMaster', 'ProMaster City'] },
  { id: 37, name: 'Rolls-Royce', models: ['Cullinan', 'Dawn', 'Ghost', 'Phantom', 'Wraith'] },
  { id: 38, name: 'Subaru', models: ['Ascent', 'BRZ', 'Crosstrek', 'Forester', 'Impreza', 'Legacy', 'Outback', 'WRX'] },
  { id: 39, name: 'Tesla', models: ['Model 3', 'Model S', 'Model X', 'Model Y'] },
  { id: 40, name: 'Toyota', models: ['4Runner', '86', 'Avalon', 'Camry', 'C-HR', 'Corolla', 'Highlander', 'Land Cruiser', 'Mirai', 'Prius', 'RAV4', 'Sequoia', 'Sienna', 'Supra', 'Tacoma', 'Tundra', 'Venza', 'Yaris'] },
  { id: 41, name: 'Volkswagen', models: ['Arteon', 'Atlas', 'Atlas Cross Sport', 'Beetle', 'Golf', 'GTI', 'Jetta', 'Passat', 'Tiguan', 'Touareg'] },
  { id: 42, name: 'Volvo', models: ['S60', 'S90', 'V60', 'V90', 'XC40', 'XC60', 'XC90'] }
];

export const getModelsByBrand = (brandName) => {
  const brand = carBrands.find(b => b.name === brandName);
  return brand ? brand.models : [];
};

export const getAllBrands = () => {
  return carBrands.map(brand => ({
    id: brand.id,
    name: brand.name
  }));
};

// Довідники для форм
export const bodyTypes = [
  { id: 3, name: 'Седан' },
  { id: 5, name: 'Позашляховик / Кросовер' },
  { id: 8, name: 'Мінівен' },
  { id: 449, name: 'Мікровен' },
  { id: 4, name: 'Хетчбек' },
  { id: 2, name: 'Універсал' },
  { id: 6, name: 'Купе' },
  { id: 7, name: 'Кабріолет' },
  { id: 9, name: 'Пікап' },
  { id: 307, name: 'Ліфтбек' },
  { id: 448, name: 'Фастбек' },
  { id: 252, name: 'Лімузин' },
  { id: 315, name: 'Родстер' }
];

export const driveTypes = [
  { id: 1, name: 'Повний' },
  { id: 2, name: 'Передній' },
  { id: 3, name: 'Задній' },
  { id: 4, name: 'Кардан' },
  { id: 5, name: 'Ремінь' },
  { id: 6, name: 'Ланцюг' }
];

export const fuelTypes = [
  { id: 1, name: 'Бензин' },
  { id: 3, name: 'Газ' },
  { id: 4, name: 'Газ пропан-бутан / Бензин' },
  { id: 8, name: 'Газ метан / Бензин' },
  { id: 5, name: 'Гібрид (HEV)' },
  { id: 10, name: 'Гібрид (PHEV)' },
  { id: 11, name: 'Гібрид (MHEV)' },
  { id: 2, name: 'Дизель' },
  { id: 6, name: 'Електро' }
];

export const transmissions = [
  { id: 1, name: 'Ручна / Механіка' },
  { id: 2, name: 'Автомат' },
  { id: 3, name: 'Типтронік' },
  { id: 4, name: 'Робот' },
  { id: 5, name: 'Варіатор' }
];

// Генерація років з поточного до 1900
export const years = Array.from({length: new Date().getFullYear() - 1900 + 1}, (_, i) => new Date().getFullYear() - i);

// Приклади для поколінь
export const generations = [
  { id: 1, name: 'I (1990-1995)' },
  { id: 2, name: 'II (1996-2000)' },
  { id: 3, name: 'III (2001-2005)' },
  { id: 4, name: 'IV (2006-2010)' },
  { id: 5, name: 'V (2011-2015)' },
  { id: 6, name: 'VI (2016-2020)' },
  { id: 7, name: 'VII (2021-2024)' }
];

// Приклади для модифікацій
export const engines = [
  { id: 1, name: '1.2 бензин, 66 кВт' },
  { id: 2, name: '1.6 бензин, 77 кВт' },
  { id: 3, name: '2.0 дизель, 110 кВт' },
  { id: 4, name: '2.5 бензин, 140 кВт' },
  { id: 5, name: '3.0 дизель, 180 кВт' },
  { id: 6, name: 'електро, 100 кВт' },
  { id: 7, name: 'гібрид, 90 кВт' }
];

export const colors = [
  { id: 1, name: 'Бежевий' },
  { id: 15, name: 'Білий' },
  { id: 16, name: 'Жовтий' },
  { id: 7, name: 'Зелений' },
  { id: 5, name: 'Коричневий' },
  { id: 9, name: 'Помаранчевий' },
  { id: 3, name: 'Синій' },
  { id: 8, name: 'Сірий' },
  { id: 12, name: 'Фіолетовий' },
  { id: 13, name: 'Червоний' },
  { id: 2, name: 'Чорний' }
];

// Технічний стан
export const technicalConditions = [
  { id: 1, name: 'Відмінний' },
  { id: 2, name: 'Дуже хороший' },
  { id: 3, name: 'Хороший' },
  { id: 4, name: 'Задовільний' },
  { id: 5, name: 'Потребує ремонту' },
  { id: 6, name: 'На запчастини' }
];

// Країни для "Пригнаний з"
export const countries = [
  { id: 1, name: 'Німеччина' },
  { id: 2, name: 'Польща' },
  { id: 3, name: 'Литва' },
  { id: 4, name: 'США' },
  { id: 5, name: 'Італія' },
  { id: 6, name: 'Франція' },
  { id: 7, name: 'Іспанія' },
  { id: 8, name: 'Чехія' },
  { id: 9, name: 'Словаччина' },
  { id: 10, name: 'Бельгія' },
  { id: 11, name: 'Нідерланди' },
  { id: 12, name: 'Швейцарія' },
  { id: 13, name: 'Австрія' },
  { id: 14, name: 'Інша країна' }
];

export const optionsList = [
  { id: 217, name: 'Антиблокувальна система (ABS)' },
  { id: 606, name: 'Антипробуксовочна система (ASR)' },
  { id: 622, name: 'Блокування замків задніх дверей' },
  { id: 617, name: 'Датчик втоми водія' },
  { id: 623, name: 'Датчик проникнення в салон (датчик об`єму)' },
  { id: 620, name: 'Датчик тиску в шинах' },
  { id: 611, name: 'Допомога при спуску' },
  { id: 609, name: 'Допомога при старті в гору' },
  { id: 612, name: 'Запобігання зіткнення' },
  { id: 604, name: 'Імобілайзер' },
  { id: 616, name: 'Контроль за смугою руху' },
  { id: 615, name: 'Контроль сліпих зон' },
  { id: 619, name: 'Нічне бачення' },
  { id: 618, name: 'Розпізнавання дорожніх знаків' },
  { id: 608, name: 'Розподіл гальмівних зусиль (BAS, EBD)' },
  { id: 303, name: 'Сигналізація' },
  { id: 621, name: 'Система кріплення IsoFix' },
  { id: 459, name: 'Система стабілізації (ESP)' },
  { id: 607, name: 'Стабілізація рульового управління (VSM)' },
  { id: 137, name: 'Центральний замок' }
];

export const transportTypes = [
  { id: 1, name: 'Легкові' },
  { id: 2, name: 'Мото' },
  { id: 6, name: 'Вантажівки' },
  { id: 7, name: 'Автобуси' }
];

// Регіони та міста (приклад)
export const regions = [
  { id: 1, name: 'Вінницька' },
  { id: 2, name: 'Волинська' },
  { id: 3, name: 'Дніпропетровська' },
  { id: 4, name: 'Донецька' },
  { id: 5, name: 'Житомирська' },
  { id: 6, name: 'Закарпатська' },
  { id: 7, name: 'Запорізька' },
  { id: 8, name: 'Івано-Франківська' },
  { id: 9, name: 'Київська' },
  { id: 10, name: 'Кіровоградська' },
  { id: 11, name: 'Луганська' },
  { id: 12, name: 'Львівська' },
  { id: 13, name: 'Миколаївська' },
  { id: 14, name: 'Одеська' },
  { id: 15, name: 'Полтавська' },
  { id: 16, name: 'Рівненська' },
  { id: 17, name: 'Сумська' },
  { id: 18, name: 'Тернопільська' },
  { id: 19, name: 'Харківська' },
  { id: 20, name: 'Херсонська' },
  { id: 21, name: 'Хмельницька' },
  { id: 22, name: 'Черкаська' },
  { id: 23, name: 'Чернівецька' },
  { id: 24, name: 'Чернігівська' },
  { id: 25, name: 'м. Київ' }
];

export const cities = [
  { id: 1, name: 'Вінниця', regionId: 1 },
  { id: 2, name: 'Жмеринка', regionId: 1 },
  { id: 3, name: 'Луцьк', regionId: 2 },
  { id: 4, name: 'Ковель', regionId: 2 },
  { id: 5, name: 'Дніпро', regionId: 3 },
  { id: 6, name: 'Кривий Ріг', regionId: 3 },
  { id: 7, name: 'Донецьк', regionId: 4 },
  { id: 8, name: 'Маріуполь', regionId: 4 },
  { id: 9, name: 'Житомир', regionId: 5 },
  { id: 10, name: 'Бердичів', regionId: 5 },
  { id: 11, name: 'Ужгород', regionId: 6 },
  { id: 12, name: 'Мукачево', regionId: 6 },
  { id: 13, name: 'Запоріжжя', regionId: 7 },
  { id: 14, name: 'Мелітополь', regionId: 7 },
  { id: 15, name: 'Івано-Франківськ', regionId: 8 },
  { id: 16, name: 'Калуш', regionId: 8 },
  { id: 17, name: 'Біла Церква', regionId: 9 },
  { id: 18, name: 'Бориспіль', regionId: 9 },
  { id: 19, name: 'Кропивницький', regionId: 10 },
  { id: 20, name: 'Олександрія', regionId: 10 },
  { id: 21, name: 'Луганськ', regionId: 11 },
  { id: 22, name: 'Сєвєродонецьк', regionId: 11 },
  { id: 23, name: 'Львів', regionId: 12 },
  { id: 24, name: 'Дрогобич', regionId: 12 },
  { id: 25, name: 'Миколаїв', regionId: 13 },
  { id: 26, name: 'Вознесенськ', regionId: 13 },
  { id: 27, name: 'Одеса', regionId: 14 },
  { id: 28, name: 'Ізмаїл', regionId: 14 },
  { id: 29, name: 'Полтава', regionId: 15 },
  { id: 30, name: 'Кременчук', regionId: 15 },
  { id: 31, name: 'Рівне', regionId: 16 },
  { id: 32, name: 'Дубно', regionId: 16 },
  { id: 33, name: 'Суми', regionId: 17 },
  { id: 34, name: 'Конотоп', regionId: 17 },
  { id: 35, name: 'Тернопіль', regionId: 18 },
  { id: 36, name: 'Чортків', regionId: 18 },
  { id: 37, name: 'Харків', regionId: 19 },
  { id: 38, name: 'Лозова', regionId: 19 },
  { id: 39, name: 'Херсон', regionId: 20 },
  { id: 40, name: 'Нова Каховка', regionId: 20 },
  { id: 41, name: 'Хмельницький', regionId: 21 },
  { id: 42, name: "Кам'янець-Подільський", regionId: 21 },
  { id: 43, name: 'Черкаси', regionId: 22 },
  { id: 44, name: 'Умань', regionId: 22 },
  { id: 45, name: 'Чернівці', regionId: 23 },
  { id: 46, name: 'Новодністровськ', regionId: 23 },
  { id: 47, name: 'Чернігів', regionId: 24 },
  { id: 48, name: 'Ніжин', regionId: 24 },
  { id: 49, name: 'Київ', regionId: 25 }
]; 