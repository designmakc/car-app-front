/**
 * Демо-дані для розробки CarMarket App
 * 
 * ІНСТРУКЦІЯ ДЛЯ БЕКЕНД-РОЗРОБНИКА:
 * 
 * 1. API Endpoints Structure:
 * 
 * GET /api/cars
 * Query Parameters:
 *   - page: number (default: 1)
 *   - limit: number (default: 20)
 *   - sort: string (options: 'price_asc', 'price_desc', 'date_asc', 'date_desc')
 *   - brand: string
 *   - model: string
 *   - year_from: number
 *   - year_to: number
 *   - price_from: number
 *   - price_to: number
 *   - body_type: string
 *   - fuel_type: string
 *   - gearbox: string
 *   - city: string
 * Response: {
 *   data: Array<Car>,
 *   total: number,
 *   page: number,
 *   totalPages: number
 * }
 * 
 * GET /api/cars/{id}
 * Response: Car
 * 
 * GET /api/cars/popular-brands
 * Response: {
 *   data: Array<{ name: string, count: number }>,
 *   total: number
 * }
 * 
 * GET /api/cars/stats
 * Response: {
 *   totalCars: number,
 *   totalDealers: number,
 *   averagePrice: number,
 *   popularCities: string[]
 * }
 * 
 * GET /api/search/suggestions
 * Query Parameters:
 *   - query: string
 * Response: {
 *   data: Array<{
 *     id: number,
 *     label: string,
 *     value: string,
 *     image: string,
 *     year: number,
 *     price: string
 *   }>
 * }
 * 
 * 2. Data Types:
 * 
 * interface Car {
 *   id: number
 *   user_id: number
 *   brand: string
 *   model: string
 *   year: number
 *   gearbox: string
 *   fuel_type: string
 *   engine_capacity: number
 *   engine_unit: string
 *   body_type: string
 *   mileage: number
 *   drive_type: string
 *   color: string
 *   city: string
 *   price: number
 *   status: string
 *   is_top: boolean
 *   images: Array<{
 *     id: number
 *     url: string
 *     is_main: boolean
 *     order: number
 *   }>
 *   created_at: string // ISO date
 * }
 * 
 * 3. Заміна демо-даних на API:
 * 
 * - Створіть файл src/api/cars.js з відповідними методами
 * - Використовуйте axios або fetch для HTTP-запитів
 * - Додайте обробку помилок та loading-станів
 * - Всі URL ендпоінтів мають бути в конфігурації (env-змінні)
 * 
 * Приклад:
 * ```js
 * // src/api/cars.js
 * import axios from 'axios'
 * 
 * const API_URL = import.meta.env.VITE_API_URL
 * 
 * export const carsApi = {
 *   // Отримання списку автомобілів
 *   async getCars(params = {}) {
 *     const response = await axios.get(`${API_URL}/cars`, { params })
 *     return response.data
 *   },
 * 
 *   // Отримання популярних брендів
 *   async getPopularBrands() {
 *     const response = await axios.get(`${API_URL}/cars/popular-brands`)
 *     return response.data
 *   },
 * 
 *   // Отримання статистики
 *   async getStats() {
 *     const response = await axios.get(`${API_URL}/cars/stats`)
 *     return response.data
 *   }
 * }
 * ```
 */

// Демо-дані для списку автомобілів
export const demoCars = [
  {
    id: 1,
    user_id: 1,
    brand: 'Volkswagen',
    model: 'Atlas',
    year: 2021,
    gearbox: 'Автомат',
    fuel_type: 'Бензин',
    engine_capacity: 2.0,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 32,
    drive_type: 'Повний',
    color: 'Синій',
    city: 'Київ',
    price: 39900,
    status: 'На майданчику',
    is_top: true,
    images: [
      {
        id: 1,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/volkswagen_atlas__478169593f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 2,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/volkswagen_atlas__478169590f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 3,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/volkswagen_atlas__478169591f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 4,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/volkswagen_atlas__478169592f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 5,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/volkswagen_atlas__478169594f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 6,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/volkswagen_atlas__478169595f.jpg',
        is_main: false,
        order: 5
      },
      {
        id: 7,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/volkswagen_atlas__478169596f.jpg',
        is_main: false,
        order: 6
      }
    ],
    created_at: '2024-03-19T10:00:00Z'
  },
  {
    id: 2,
    user_id: 2,
    brand: 'BMW',
    model: 'X5',
    year: 2022,
    gearbox: 'Автомат',
    fuel_type: 'Дизель',
    engine_capacity: 3.0,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 15,
    drive_type: 'Повний',
    color: 'Чорний',
    city: 'Одеса',
    price: 85000,
    status: 'На майданчику',
    is_top: true,
    images: [
      {
        id: 5,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/bmw_x5__478169600f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 6,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/bmw_x5__478169601f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 7,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/bmw_x5__478169602f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 8,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/bmw_x5__478169603f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 9,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/bmw_x5__478169604f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 10,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/bmw_x5__478169605f.jpg',
        is_main: false,
        order: 5
      },
      {
        id: 11,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/bmw_x5__478169606f.jpg',
        is_main: false,
        order: 6
      },
      {
        id: 12,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/bmw_x5__478169607f.jpg',
        is_main: false,
        order: 7
      }
    ],
    created_at: '2024-03-18T15:30:00Z'
  },
  {
    id: 3,
    user_id: 3,
    brand: 'Toyota',
    model: 'Camry',
    year: 2023,
    gearbox: 'Автомат',
    fuel_type: 'Гібрид',
    engine_capacity: 2.5,
    engine_unit: 'л',
    body_type: 'Седан',
    mileage: 5,
    drive_type: 'Передній',
    color: 'Білий',
    city: 'Львів',
    price: 42000,
    status: 'На майданчику',
    is_top: false,
    images: [
      {
        id: 8,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/toyota_camry__478169610f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 9,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/toyota_camry__478169611f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 10,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/toyota_camry__478169612f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 11,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/toyota_camry__478169613f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 12,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/toyota_camry__478169614f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 13,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/toyota_camry__478169615f.jpg',
        is_main: false,
        order: 5
      }
    ],
    created_at: '2024-03-17T09:15:00Z'
  },
  {
    id: 4,
    user_id: 4,
    brand: 'Mercedes-Benz',
    model: 'E-Class',
    year: 2023,
    gearbox: 'Автомат',
    fuel_type: 'Дизель',
    engine_capacity: 2.0,
    engine_unit: 'л',
    body_type: 'Седан',
    mileage: 8,
    drive_type: 'Задній',
    color: 'Сірий',
    city: 'Київ',
    price: 75000,
    status: 'На майданчику',
    is_top: false,
    images: [
      {
        id: 10,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/mercedes_e-class__478169620f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 11,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/mercedes_e-class__478169621f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 12,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/mercedes_e-class__478169622f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 13,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/mercedes_e-class__478169623f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 14,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/mercedes_e-class__478169624f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 15,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/mercedes_e-class__478169625f.jpg',
        is_main: false,
        order: 5
      },
      {
        id: 16,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/mercedes_e-class__478169626f.jpg',
        is_main: false,
        order: 6
      }
    ],
    created_at: '2024-03-16T14:20:00Z'
  },
  {
    id: 5,
    user_id: 5,
    brand: 'Audi',
    model: 'Q7',
    year: 2022,
    gearbox: 'Автомат',
    fuel_type: 'Бензин',
    engine_capacity: 3.0,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 25,
    drive_type: 'Повний',
    color: 'Чорний',
    city: 'Харків',
    price: 65000,
    status: 'На майданчику',
    is_top: false,
    images: [
      {
        id: 11,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/audi_q7__478169630f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 32,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/audi_q7__478169631f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 33,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/audi_q7__478169632f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 34,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/audi_q7__478169633f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 35,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/audi_q7__478169634f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 36,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/audi_q7__478169635f.jpg',
        is_main: false,
        order: 5
      }
    ],
    created_at: '2024-03-15T11:45:00Z'
  },
  {
    id: 6,
    user_id: 6,
    brand: 'Honda',
    model: 'CR-V',
    year: 2021,
    gearbox: 'Автомат',
    fuel_type: 'Бензин',
    engine_capacity: 2.0,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 45,
    drive_type: 'Повний',
    color: 'Сірий',
    city: 'Дніпро',
    price: 32000,
    status: 'На майданчику',
    is_top: false,
    images: [
      {
        id: 12,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/honda_cr-v__478169640f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 37,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/honda_cr-v__478169641f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 38,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/honda_cr-v__478169642f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 39,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/honda_cr-v__478169643f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 40,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/honda_cr-v__478169644f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 41,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/honda_cr-v__478169645f.jpg',
        is_main: false,
        order: 5
      },
      {
        id: 42,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/honda_cr-v__478169646f.jpg',
        is_main: false,
        order: 6
      }
    ],
    created_at: '2024-03-14T13:20:00Z'
  },
  {
    id: 7,
    user_id: 7,
    brand: 'Lexus',
    model: 'RX',
    year: 2022,
    gearbox: 'Автомат',
    fuel_type: 'Гібрид',
    engine_capacity: 3.5,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 18,
    drive_type: 'Повний',
    color: 'Білий',
    city: 'Київ',
    price: 78000,
    status: 'На майданчику',
    is_top: true,
    images: [
      {
        id: 13,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/lexus_rx__478169650f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 43,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/lexus_rx__478169651f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 44,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/lexus_rx__478169652f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 45,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/lexus_rx__478169653f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 46,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/lexus_rx__478169654f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 47,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/lexus_rx__478169655f.jpg',
        is_main: false,
        order: 5
      }
    ],
    created_at: '2024-03-13T16:45:00Z'
  },
  {
    id: 8,
    user_id: 8,
    brand: 'Hyundai',
    model: 'Tucson',
    year: 2023,
    gearbox: 'Автомат',
    fuel_type: 'Дизель',
    engine_capacity: 2.0,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 12,
    drive_type: 'Повний',
    color: 'Зелений',
    city: 'Львів',
    price: 35000,
    status: 'На майданчику',
    is_top: false,
    images: [
      {
        id: 14,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/hyundai_tucson__478169660f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 48,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/hyundai_tucson__478169661f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 49,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/hyundai_tucson__478169662f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 50,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/hyundai_tucson__478169663f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 51,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/hyundai_tucson__478169664f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 52,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/hyundai_tucson__478169665f.jpg',
        is_main: false,
        order: 5
      }
    ],
    created_at: '2024-03-12T10:30:00Z'
  },
  {
    id: 9,
    user_id: 9,
    brand: 'Porsche',
    model: 'Cayenne',
    year: 2021,
    gearbox: 'Автомат',
    fuel_type: 'Бензин',
    engine_capacity: 3.0,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 35,
    drive_type: 'Повний',
    color: 'Чорний',
    city: 'Одеса',
    price: 95000,
    status: 'На майданчику',
    is_top: true,
    images: [
      {
        id: 15,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/porsche_cayenne__478169670f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 53,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/porsche_cayenne__478169671f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 54,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/porsche_cayenne__478169672f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 55,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/porsche_cayenne__478169673f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 56,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/porsche_cayenne__478169674f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 57,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/porsche_cayenne__478169675f.jpg',
        is_main: false,
        order: 5
      },
      {
        id: 58,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/porsche_cayenne__478169676f.jpg',
        is_main: false,
        order: 6
      }
    ],
    created_at: '2024-03-11T14:15:00Z'
  },
  {
    id: 10,
    user_id: 10,
    brand: 'Mazda',
    model: 'CX-5',
    year: 2022,
    gearbox: 'Автомат',
    fuel_type: 'Бензин',
    engine_capacity: 2.5,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 28,
    drive_type: 'Повний',
    color: 'Червоний',
    city: 'Харків',
    price: 33000,
    status: 'На майданчику',
    is_top: false,
    images: [
      {
        id: 16,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/mazda_cx-5__478169680f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 59,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/mazda_cx-5__478169681f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 60,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/mazda_cx-5__478169682f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 61,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/mazda_cx-5__478169683f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 62,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/mazda_cx-5__478169684f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 63,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/mazda_cx-5__478169685f.jpg',
        is_main: false,
        order: 5
      }
    ],
    created_at: '2024-03-10T09:40:00Z'
  },
  {
    id: 11,
    user_id: 11,
    brand: 'Volvo',
    model: 'XC90',
    year: 2023,
    gearbox: 'Автомат',
    fuel_type: 'Дизель',
    engine_capacity: 2.0,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 15,
    drive_type: 'Повний',
    color: 'Синій',
    city: 'Київ',
    price: 82000,
    status: 'На майданчику',
    is_top: true,
    images: [
      {
        id: 17,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/volvo_xc90__478169690f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 64,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/volvo_xc90__478169691f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 65,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/volvo_xc90__478169692f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 66,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/volvo_xc90__478169693f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 67,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/volvo_xc90__478169694f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 68,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/volvo_xc90__478169695f.jpg',
        is_main: false,
        order: 5
      }
    ],
    created_at: '2024-03-09T15:20:00Z'
  },
  {
    id: 12,
    user_id: 12,
    brand: 'Kia',
    model: 'Sportage',
    year: 2022,
    gearbox: 'Автомат',
    fuel_type: 'Бензин',
    engine_capacity: 2.0,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 42,
    drive_type: 'Передній',
    color: 'Сірий',
    city: 'Дніпро',
    price: 29000,
    status: 'На майданчику',
    is_top: false,
    images: [
      {
        id: 18,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/kia_sportage__478169700f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 69,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/kia_sportage__478169701f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 70,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/kia_sportage__478169702f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 71,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/kia_sportage__478169703f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 72,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/kia_sportage__478169704f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 73,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/kia_sportage__478169705f.jpg',
        is_main: false,
        order: 5
      }
    ],
    created_at: '2024-03-08T11:30:00Z'
  },
  {
    id: 13,
    user_id: 13,
    brand: 'Land Rover',
    model: 'Range Rover',
    year: 2021,
    gearbox: 'Автомат',
    fuel_type: 'Дизель',
    engine_capacity: 3.0,
    engine_unit: 'л',
    body_type: 'Позашляховик',
    mileage: 38,
    drive_type: 'Повний',
    color: 'Чорний',
    city: 'Київ',
    price: 110000,
    status: 'На майданчику',
    is_top: true,
    images: [
      {
        id: 19,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/land-rover_range-rover__478169710f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 74,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/land-rover_range-rover__478169711f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 75,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/land-rover_range-rover__478169712f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 76,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/land-rover_range-rover__478169713f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 77,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/land-rover_range-rover__478169714f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 78,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/land-rover_range-rover__478169715f.jpg',
        is_main: false,
        order: 5
      },
      {
        id: 79,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/land-rover_range-rover__478169716f.jpg',
        is_main: false,
        order: 6
      }
    ],
    created_at: '2024-03-07T14:45:00Z'
  },
  {
    id: 14,
    user_id: 14,
    brand: 'Subaru',
    model: 'Forester',
    year: 2022,
    gearbox: 'Автомат',
    fuel_type: 'Бензин',
    engine_capacity: 2.5,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 25,
    drive_type: 'Повний',
    color: 'Зелений',
    city: 'Львів',
    price: 36000,
    status: 'На майданчику',
    is_top: false,
    images: [
      {
        id: 20,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/subaru_forester__478169720f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 80,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/subaru_forester__478169721f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 81,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/subaru_forester__478169722f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 82,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/subaru_forester__478169723f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 83,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/subaru_forester__478169724f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 84,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/subaru_forester__478169725f.jpg',
        is_main: false,
        order: 5
      }
    ],
    created_at: '2024-03-06T10:15:00Z'
  },
  {
    id: 15,
    user_id: 15,
    brand: 'Infiniti',
    model: 'QX80',
    year: 2023,
    gearbox: 'Автомат',
    fuel_type: 'Бензин',
    engine_capacity: 5.6,
    engine_unit: 'л',
    body_type: 'Позашляховик',
    mileage: 10,
    drive_type: 'Повний',
    color: 'Білий',
    city: 'Одеса',
    price: 98000,
    status: 'На майданчику',
    is_top: true,
    images: [
      {
        id: 21,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/infiniti_qx80__478169730f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 85,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/infiniti_qx80__478169731f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 86,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/infiniti_qx80__478169732f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 87,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/infiniti_qx80__478169733f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 88,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/infiniti_qx80__478169734f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 89,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/infiniti_qx80__478169735f.jpg',
        is_main: false,
        order: 5
      },
      {
        id: 90,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/infiniti_qx80__478169736f.jpg',
        is_main: false,
        order: 6
      }
    ],
    created_at: '2024-03-05T16:30:00Z'
  },
  {
    id: 16,
    user_id: 16,
    brand: 'Nissan',
    model: 'X-Trail',
    year: 2022,
    gearbox: 'Автомат',
    fuel_type: 'Дизель',
    engine_capacity: 2.0,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 32,
    drive_type: 'Повний',
    color: 'Сірий',
    city: 'Харків',
    price: 31000,
    status: 'На майданчику',
    is_top: false,
    images: [
      {
        id: 22,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/nissan_x-trail__478169740f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 91,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/nissan_x-trail__478169741f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 92,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/nissan_x-trail__478169742f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 93,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/nissan_x-trail__478169743f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 94,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/nissan_x-trail__478169744f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 95,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/nissan_x-trail__478169745f.jpg',
        is_main: false,
        order: 5
      }
    ],
    created_at: '2024-03-04T12:20:00Z'
  },
  {
    id: 17,
    user_id: 17,
    brand: 'Jaguar',
    model: 'F-Pace',
    year: 2023,
    gearbox: 'Автомат',
    fuel_type: 'Бензин',
    engine_capacity: 3.0,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 8,
    drive_type: 'Повний',
    color: 'Червоний',
    city: 'Київ',
    price: 85000,
    status: 'На майданчику',
    is_top: true,
    images: [
      {
        id: 23,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/jaguar_f-pace__478169750f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 96,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/jaguar_f-pace__478169751f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 97,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/jaguar_f-pace__478169752f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 98,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/jaguar_f-pace__478169753f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 99,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/jaguar_f-pace__478169754f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 100,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/jaguar_f-pace__478169755f.jpg',
        is_main: false,
        order: 5
      },
      {
        id: 101,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/jaguar_f-pace__478169756f.jpg',
        is_main: false,
        order: 6
      }
    ],
    created_at: '2024-03-03T09:50:00Z'
  },
  {
    id: 18,
    user_id: 18,
    brand: 'Renault',
    model: 'Koleos',
    year: 2022,
    gearbox: 'Автомат',
    fuel_type: 'Дизель',
    engine_capacity: 2.0,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 45,
    drive_type: 'Передній',
    color: 'Коричневий',
    city: 'Львів',
    price: 27000,
    status: 'На майданчику',
    is_top: false,
    images: [
      {
        id: 24,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/renault_koleos__478169760f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 102,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/renault_koleos__478169761f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 103,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/renault_koleos__478169762f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 104,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/renault_koleos__478169763f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 105,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/renault_koleos__478169764f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 106,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/renault_koleos__478169765f.jpg',
        is_main: false,
        order: 5
      }
    ],
    created_at: '2024-03-02T14:10:00Z'
  },
  {
    id: 19,
    user_id: 19,
    brand: 'Maserati',
    model: 'Levante',
    year: 2021,
    gearbox: 'Автомат',
    fuel_type: 'Бензин',
    engine_capacity: 3.0,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 28,
    drive_type: 'Повний',
    color: 'Синій',
    city: 'Одеса',
    price: 115000,
    status: 'На майданчику',
    is_top: true,
    images: [
      {
        id: 25,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/maserati_levante__478169770f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 107,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/maserati_levante__478169771f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 108,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/maserati_levante__478169772f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 109,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/maserati_levante__478169773f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 110,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/maserati_levante__478169774f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 111,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/maserati_levante__478169775f.jpg',
        is_main: false,
        order: 5
      },
      {
        id: 112,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/maserati_levante__478169776f.jpg',
        is_main: false,
        order: 6
      }
    ],
    created_at: '2024-03-01T11:25:00Z'
  },
  {
    id: 20,
    user_id: 20,
    brand: 'Mitsubishi',
    model: 'Outlander',
    year: 2022,
    gearbox: 'Автомат',
    fuel_type: 'Бензин',
    engine_capacity: 2.4,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 35,
    drive_type: 'Повний',
    color: 'Чорний',
    city: 'Дніпро',
    price: 32000,
    status: 'На майданчику',
    is_top: false,
    images: [
      {
        id: 26,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/mitsubishi_outlander__478169780f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 113,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/mitsubishi_outlander__478169781f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 114,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/mitsubishi_outlander__478169782f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 115,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/mitsubishi_outlander__478169783f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 116,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/mitsubishi_outlander__478169784f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 117,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/mitsubishi_outlander__478169785f.jpg',
        is_main: false,
        order: 5
      }
    ],
    created_at: '2024-02-29T15:40:00Z'
  },
  {
    id: 21,
    user_id: 21,
    brand: 'Acura',
    model: 'MDX',
    year: 2023,
    gearbox: 'Автомат',
    fuel_type: 'Бензин',
    engine_capacity: 3.5,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 12,
    drive_type: 'Повний',
    color: 'Сірий',
    city: 'Київ',
    price: 75000,
    status: 'На майданчику',
    is_top: true,
    images: [
      {
        id: 27,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/acura_mdx__478169790f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 118,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/acura_mdx__478169791f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 119,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/acura_mdx__478169792f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 120,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/acura_mdx__478169793f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 121,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/acura_mdx__478169794f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 122,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/acura_mdx__478169795f.jpg',
        is_main: false,
        order: 5
      },
      {
        id: 123,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/acura_mdx__478169796f.jpg',
        is_main: false,
        order: 6
      }
    ],
    created_at: '2024-02-28T10:15:00Z'
  },
  {
    id: 22,
    user_id: 22,
    brand: 'Genesis',
    model: 'GV80',
    year: 2023,
    gearbox: 'Автомат',
    fuel_type: 'Дизель',
    engine_capacity: 3.0,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 15,
    drive_type: 'Повний',
    color: 'Білий',
    city: 'Харків',
    price: 82000,
    status: 'На майданчику',
    is_top: true,
    images: [
      {
        id: 28,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/genesis_gv80__478169800f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 124,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/genesis_gv80__478169801f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 125,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/genesis_gv80__478169802f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 126,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/genesis_gv80__478169803f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 127,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/genesis_gv80__478169804f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 128,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/genesis_gv80__478169805f.jpg',
        is_main: false,
        order: 5
      }
    ],
    created_at: '2024-02-27T13:30:00Z'
  },
  {
    id: 23,
    user_id: 23,
    brand: 'Alfa Romeo',
    model: 'Stelvio',
    year: 2022,
    gearbox: 'Автомат',
    fuel_type: 'Бензин',
    engine_capacity: 2.0,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 22,
    drive_type: 'Повний',
    color: 'Червоний',
    city: 'Львів',
    price: 55000,
    status: 'На майданчику',
    is_top: false,
    images: [
      {
        id: 29,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/alfa-romeo_stelvio__478169810f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 129,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/alfa-romeo_stelvio__478169811f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 130,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/alfa-romeo_stelvio__478169812f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 131,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/alfa-romeo_stelvio__478169813f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 132,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/alfa-romeo_stelvio__478169814f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 133,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/alfa-romeo_stelvio__478169815f.jpg',
        is_main: false,
        order: 5
      }
    ],
    created_at: '2024-02-26T16:45:00Z'
  },
  {
    id: 24,
    user_id: 24,
    brand: 'Lincoln',
    model: 'Aviator',
    year: 2023,
    gearbox: 'Автомат',
    fuel_type: 'Бензин',
    engine_capacity: 3.0,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 18,
    drive_type: 'Повний',
    color: 'Чорний',
    city: 'Одеса',
    price: 89000,
    status: 'На майданчику',
    is_top: true,
    images: [
      {
        id: 30,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/lincoln_aviator__478169820f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 134,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/lincoln_aviator__478169821f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 135,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/lincoln_aviator__478169822f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 136,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/lincoln_aviator__478169823f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 137,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/lincoln_aviator__478169824f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 138,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/lincoln_aviator__478169825f.jpg',
        is_main: false,
        order: 5
      },
      {
        id: 139,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/lincoln_aviator__478169826f.jpg',
        is_main: false,
        order: 6
      }
    ],
    created_at: '2024-02-25T11:20:00Z'
  },
  {
    id: 25,
    user_id: 25,
    brand: 'Cadillac',
    model: 'XT6',
    year: 2022,
    gearbox: 'Автомат',
    fuel_type: 'Бензин',
    engine_capacity: 3.6,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 25,
    drive_type: 'Повний',
    color: 'Сірий',
    city: 'Дніпро',
    price: 72000,
    status: 'На майданчику',
    is_top: true,
    images: [
      {
        id: 31,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/cadillac_xt6__478169830f.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 140,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/cadillac_xt6__478169831f.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 141,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/cadillac_xt6__478169832f.jpg',
        is_main: false,
        order: 2
      },
      {
        id: 142,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/cadillac_xt6__478169833f.jpg',
        is_main: false,
        order: 3
      },
      {
        id: 143,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/cadillac_xt6__478169834f.jpg',
        is_main: false,
        order: 4
      },
      {
        id: 144,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/cadillac_xt6__478169835f.jpg',
        is_main: false,
        order: 5
      }
    ],
    created_at: '2024-02-24T14:50:00Z'
  },
  {
    id: 26,
    user_id: 26,
    brand: 'Porsche',
    model: 'Macan',
    year: 2023,
    gearbox: 'Автомат',
    fuel_type: 'Бензин',
    engine_capacity: 2.0,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 8,
    drive_type: 'Повний',
    color: 'Синій металік',
    city: 'Київ',
    price: 68000,
    status: 'На майданчику',
    is_top: true,
    images: [
      {
        id: 145,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/mitsubishi_lancer__534652950hd.webp',
        is_main: true,
        order: 0
      },
      {
        id: 146,
        url: 'https://cdn3.riastatic.com/photosnew/auto/photo/mitsubishi_lancer__534652968hd.webp',
        is_main: false,
        order: 1
      },
      {
        id: 147,
        url: 'https://cdn0.riastatic.com/photosnew/auto/photo/mitsubishi_lancer__534653020hd.webp',
        is_main: false,
        order: 2
      },
      {
        id: 148,
        url: 'https://cdn2.riastatic.com/photosnew/auto/photo/mitsubishi_lancer__534652987hd.webp',
        is_main: false,
        order: 3
      },
      {
        id: 149,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/mitsubishi_lancer__534653016hd.webp',
        is_main: false,
        order: 4
      },
      {
        id: 150,
        url: 'https://cdn1.riastatic.com/photosnew/auto/photo/mitsubishi_lancer__534653006hd.webp',
        is_main: false,
        order: 5
      }
    ],
    created_at: '2024-03-20T09:30:00Z'
  }
]

// Демо-дані для пошуку
export const demoSearchSuggestions = [
  {
    id: 1,
    label: 'Toyota Camry',
    value: 'toyota-camry',
    image: 'https://cdn3.riastatic.com/photosnew/auto/photo/toyota_camry__478169610f.jpg',
    year: 2019,
    price: '15 200 $'
  },
  {
    id: 2,
    label: 'Volkswagen Passat',
    value: 'vw-passat',
    image: 'https://cdn0.riastatic.com/photosnew/auto/photo/volkswagen_atlas__478169590f.jpg',
    year: 2019,
    price: '15 200 $'
  },
  {
    id: 3,
    label: 'BMW X5',
    value: 'bmw-x5',
    image: 'https://cdn3.riastatic.com/photosnew/auto/photo/bmw_x5__478169600f.jpg',
    year: 2021,
    price: '45 000 $'
  }
]

// Демо-дані для форми продажу авто
export const demoCarFormData = {
  brands: ['Audi', 'BMW', 'Mercedes-Benz', 'Toyota', 'Volkswagen'],
  models: {
    'BMW': ['X5', 'X6', '5 Series', '7 Series'],
    'Toyota': ['Camry', 'RAV4', 'Land Cruiser'],
    'Volkswagen': ['Passat', 'Golf', 'Tiguan', 'Atlas']
  },
  bodyTypes: ['Седан', 'Кросовер', 'Універсал', 'Хетчбек'],
  fuelTypes: ['Бензин', 'Дизель', 'Гібрид', 'Електро'],
  gearboxTypes: ['Автомат', 'Механіка', 'Робот', 'Варіатор'],
  driveTypes: ['Передній', 'Задній', 'Повний'],
  cities: ['Київ', 'Одеса', 'Львів', 'Харків', 'Дніпро']
}

// Популярні бренди
export const demoPopularBrands = [
  { name: 'Volkswagen', count: 1205 },
  { name: 'Toyota', count: 983 },
  { name: 'BMW', count: 875 },
  { name: 'Mercedes-Benz', count: 742 },
  { name: 'Audi', count: 658 },
  { name: 'Honda', count: 524 },
  { name: 'Ford', count: 498 },
  { name: 'Hyundai', count: 432 },
  { name: 'Kia', count: 387 },
  { name: 'Nissan', count: 365 },
  { name: 'Mazda', count: 298 },
  { name: 'Lexus', count: 276 }
]

// Загальна статистика
export const demoStats = {
  totalCars: 8754,
  totalDealers: 245,
  averagePrice: 35000,
  popularCities: ['Київ', 'Одеса', 'Львів', 'Харків', 'Дніпро']
}

// Демо-дані для фільтрів пошуку
export const demoSearchFilters = {
  priceRanges: [
    { label: 'До $5,000', value: [0, 5000] },
    { label: '$5,000 - $10,000', value: [5000, 10000] },
    { label: '$10,000 - $20,000', value: [10000, 20000] },
    { label: '$20,000 - $30,000', value: [20000, 30000] },
    { label: 'Більше $30,000', value: [30000, null] }
  ],
  years: Array.from({ length: 30 }, (_, i) => 2024 - i),
  mileageRanges: [
    { label: 'До 1,000 км', value: [0, 1000] },
    { label: '1,000 - 10,000 км', value: [1000, 10000] },
    { label: '10,000 - 50,000 км', value: [10000, 50000] },
    { label: '50,000 - 100,000 км', value: [50000, 100000] },
    { label: 'Більше 100,000 км', value: [100000, null] }
  ]
} 