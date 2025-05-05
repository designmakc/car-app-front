/**
 * Типи даних для бази даних автомобілів
 * @typedef {Object} CarDatabaseSchema
 */

/**
 * Константи для статусів автомобіля
 */
export const CAR_STATUSES = {
  AVAILABLE: 'available',
  ON_PARKING: 'На майданчику',
  SOLD: 'sold',
  RESERVED: 'reserved',
  PENDING: 'pending'
}

/**
 * Константи для типів палива
 */
export const FUEL_TYPES = {
  PETROL: 'Бензин',
  DIESEL: 'Дизель',
  GAS: 'Газ',
  ELECTRIC: 'Електро',
  HYBRID: 'Гібрид'
}

/**
 * Константи для типів коробки передач
 */
export const GEARBOX_TYPES = {
  MANUAL: 'Механіка',
  AUTOMATIC: 'Автомат',
  ROBOT: 'Робот',
  VARIATOR: 'Варіатор'
}

/**
 * Схема бази даних автомобілів
 */
export const CAR_DATABASE_SCHEMA = {
  // Основна інформація
  id: {
    type: 'number',
    required: true,
    description: 'Унікальний ідентифікатор автомобіля'
  },
  user_id: {
    type: 'number',
    required: true,
    description: 'ID користувача-власника'
  },
  type: {
    type: 'string',
    description: 'Тип транспортного засобу'
  },
  brand: {
    type: 'string',
    required: true,
    description: 'Марка автомобіля'
  },
  model: {
    type: 'string',
    required: true,
    description: 'Модель автомобіля'
  },
  year: {
    type: 'number',
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1,
    description: 'Рік випуску'
  },
  state_number: {
    type: 'string',
    description: 'Державний номер'
  },
  
  // Технічні характеристики
  gearbox: {
    type: 'string',
    required: true,
    enum: Object.values(GEARBOX_TYPES),
    description: 'Тип коробки передач'
  },
  fuel_type: {
    type: 'string',
    required: true,
    enum: Object.values(FUEL_TYPES),
    description: 'Тип палива'
  },
  engine_capacity: {
    type: 'number',
    required: true,
    min: 0,
    description: 'Об\'єм двигуна'
  },
  engine_unit: {
    type: 'string',
    default: 'л',
    description: 'Одиниця виміру об\'єму двигуна'
  },
  body_type: {
    type: 'string',
    required: true,
    description: 'Тип кузова'
  },
  drive_type: {
    type: 'string',
    description: 'Тип приводу'
  },
  seats_number: {
    type: 'number',
    min: 1,
    description: 'Кількість місць'
  },
  mileage: {
    type: 'number',
    required: true,
    min: 0,
    description: 'Пробіг в тис. км'
  },
  
  // Додаткова інформація
  imported_from: {
    type: 'string',
    description: 'Країна імпорту'
  },
  exchange_available: {
    type: 'boolean',
    default: false,
    description: 'Можливість обміну'
  },
  keys_count: {
    type: 'number',
    min: 1,
    description: 'Кількість ключів'
  },
  extra_tires: {
    type: 'boolean',
    default: false,
    description: 'Наявність додаткових шин'
  },
  owner_info: {
    type: 'string',
    description: 'Інформація про власника'
  },
  vin: {
    type: 'string',
    description: 'VIN-код автомобіля'
  },
  
  // Локація та ціна
  color: {
    type: 'string',
    description: 'Колір автомобіля'
  },
  city: {
    type: 'string',
    required: true,
    description: 'Місто'
  },
  region: {
    type: 'string',
    description: 'Область'
  },
  price: {
    type: 'number',
    required: true,
    min: 0,
    description: 'Ціна в доларах США'
  },
  
  // Статуси та метрики
  status: {
    type: 'string',
    enum: Object.values(CAR_STATUSES),
    default: CAR_STATUSES.AVAILABLE,
    description: 'Статус автомобіля'
  },
  views_parking: {
    type: 'number',
    default: 0,
    description: 'Кількість переглядів на майданчику'
  },
  views_count: {
    type: 'number',
    default: 0,
    description: 'Загальна кількість переглядів'
  },
  is_top: {
    type: 'boolean',
    default: false,
    description: 'Чи є оголошення в ТОП'
  },
  
  // Зображення та дати
  sold_car_image: {
    type: 'string',
    description: 'URL головного зображення'
  },
  sold_at: {
    type: 'string',
    description: 'Дата продажу'
  },
  created_at: {
    type: 'string',
    required: true,
    description: 'Дата створення оголошення'
  },
  updated_at: {
    type: 'string',
    description: 'Дата останнього оновлення'
  }
}

/**
 * Валідація обов'язкових полів
 */
export const REQUIRED_FIELDS = Object.entries(CAR_DATABASE_SCHEMA)
  .filter(([_, schema]) => schema.required)
  .map(([field]) => field)

/**
 * Валідація мінімальних значень
 */
export const MIN_VALUES = Object.entries(CAR_DATABASE_SCHEMA)
  .filter(([_, schema]) => schema.min !== undefined)
  .reduce((acc, [field, schema]) => ({
    ...acc,
    [field]: schema.min
  }), {})

/**
 * Валідація максимальних значень
 */
export const MAX_VALUES = Object.entries(CAR_DATABASE_SCHEMA)
  .filter(([_, schema]) => schema.max !== undefined)
  .reduce((acc, [field, schema]) => ({
    ...acc,
    [field]: schema.max
  }), {})

/**
 * Значення за замовчуванням
 */
export const DEFAULT_VALUES = Object.entries(CAR_DATABASE_SCHEMA)
  .filter(([_, schema]) => schema.default !== undefined)
  .reduce((acc, [field, schema]) => ({
    ...acc,
    [field]: schema.default
  }), {}) 