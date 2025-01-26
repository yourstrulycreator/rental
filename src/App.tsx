declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Car, Calendar, Users, Mail, Phone, MapPin, Clock, Shield, ChevronLeft, ChevronRight, Fuel, Gauge, Users2, Check, X } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Add these constants at the top of your file (you'll get these from EmailJS dashboard)
const EMAILJS_SERVICE_ID = "service_rntu3ae";
const EMAILJS_TEMPLATE_ID = "template_alcvxon";
const EMAILJS_PUBLIC_KEY = "4luNgD1oJdhvchj51";

// Update all image imports to use absolute paths starting with /src/
import gol10mpi from '/src/assets/img/gol10mpi.jpeg';
import argo103c from '/src/assets/img/argo103c.jpeg';
import dusterzen16 from '/src/assets/img/dusterzen16.jpeg';
import hilux from '/src/assets/img/hilux.jpg';
import l200 from '/src/assets/img/l200.jpg';
import onix from '/src/assets/img/onix.jpg';
import s10 from '/src/assets/img/s10.jpg';
import strada from '/src/assets/img/strada.jpg';
import toro from '/src/assets/img/toro.jpg';
import sprinter from '/src/assets/img/sprinter.jpg';
import robust from '/src/assets/img/robust.jpg';
import logo from '/src/assets/logo2.png';  // for header
import footerLogo from '/src/assets/logo2.png';  // for footer

interface CarOption {
  id: number;
  name: string;
  type: string;
  plate: string;
  color: string;
  year: number;
  kilometers: number;
  fipePrice: number;
  salePrice: number;
  image: string;
  transmission: string;
  observations: string;
}

const carsData: CarOption[] = [
  {
    id: 1,
    plate: "RVS5F09",
    name: "GOL 1.0 Mpi",
    color: "Volkswagen",
    year: 2023,
    kilometers: 110230,
    fipePrice: 55344.00,
    salePrice: 44000.00,
    type: "hatch",
    transmission: "manual",
    observations: "Hood and Right Fender Repainted",
    image: gol10mpi
  },
  {
    id: 2,
    plate: "SIR2G77",
    name: "ARGO 1.0 3C",
    color: "Fiat",
    year: 2024,
    kilometers: 22000,
    fipePrice: 71822.00,
    salePrice: 66500.00,
    type: "hatch",
    transmission: "manual",
    observations: "No Touch-ups",
    image: argo103c
  },
  {
    id: 3,
    plate: "SGA3G18",
    name: "ARGO 1.0 3C",
    color: "Fiat",
    year: 2024,
    kilometers: 28000,
    fipePrice: 71822.00,
    salePrice: 66000.00,
    type: "hatch",
    transmission: "manual",
    observations: "No Touch-ups",
    image: argo103c
  },
  {
    id: 4,
    plate: "SIU2B97",
    name: "ARGO 1.0 3C",
    color: "Fiat",
    year: 2024,
    kilometers: 86000,
    fipePrice: 71822.00,
    salePrice: 63000.00,
    type: "hatch",
    transmission: "manual",
    observations: "Left Side Repainted",
    image: argo103c
  },
  {
    id: 5,
    plate: "RMQ9J36",
    name: "Duster ZEN 1.6 Manual",
    color: "Renault",
    year: 2022,
    kilometers: 79000,
    fipePrice: 76569.00,
    salePrice: 66990.00,
    type: "suv",
    transmission: "manual",
    observations: "Left Fender Repainted",
    image: dusterzen16
  },
  {
    id: 6,
    plate: "RMQ4E63",
    name: "Duster ZEN 1.6 Manual",
    color: "Renault",
    year: 2022,
    kilometers: 91000,
    fipePrice: 76569.00,
    salePrice: 66990.00,
    type: "suv",
    transmission: "manual",
    observations: "Left Fender Repainted",
    image: dusterzen16
  },
  {
    id: 7,
    plate: "RFY4G48",
    name: "Hilux CD 4x4 manual Diesel",
    color: "Toyota",
    year: 2020,
    kilometers: 107000,
    fipePrice: 153560.00,
    salePrice: 99990.00,
    type: "pickup",
    transmission: "manual",
    observations: "No Touch-ups / 4x4 Not Working",
    image: hilux
  },
  {
    id: 8,
    plate: "RMP0B00",
    name: "Hilux CD 4x4 manual Diesel",
    color: "Toyota",
    year: 2021,
    kilometers: 200000,
    fipePrice: 157399.00,
    salePrice: 119990.00,
    type: "pickup",
    transmission: "manual",
    observations: "Truck Bed Needs Repairs",
    image: hilux
  },
  {
    id: 9,
    plate: "RMP6H09",
    name: "Hilux CD 4x4 manual Diesel",
    color: "Toyota",
    year: 2021,
    kilometers: 185000,
    fipePrice: 157399.00,
    salePrice: 119990.00,
    type: "pickup",
    transmission: "manual",
    observations: "Truck Bed Needs Repairs",
    image: hilux
  },
  {
    id: 10,
    plate: "QXN0E56",
    name: "Hilux CD 4x4 manual Diesel",
    color: "Toyota",
    year: 2020,
    kilometers: 92000,
    fipePrice: 153560.00,
    salePrice: 119990.00,
    type: "pickup",
    transmission: "manual",
    observations: "Caçamba 2 lds/ Tpa Tras / Para-lama Le Repintadas",
    image: hilux
  },
  {
    id: 11,
    plate: "RQX7A16",
    name: "Hilux CD 4x4 manual Diesel",
    color: "Toyota",
    year: 2021,
    kilometers: 52000,
    fipePrice: 157399.00,
    salePrice: 122990.00,
    type: "pickup",
    transmission: "manual",
    observations: "Some Touch-ups, conferir no vídeo",
    image: hilux
  },
  {
    id: 12,
    plate: "RQQ6J46",
    name: "Hilux CD 4x4 manual Diesel",
    color: "Toyota",
    year: 2021,
    kilometers: 59000,
    fipePrice: 157399.00,
    salePrice: 122990.00,
    type: "pickup",
    transmission: "manual",
    observations: "Chassis Needs Remarking",
    image: hilux
  },
  {
    id: 13,
    plate: "RQQ6J66",
    name: "Hilux CD 4x4 manual Diesel",
    color: "Toyota",
    year: 2021,
    kilometers: 62000,
    fipePrice: 157399.00,
    salePrice: 122990.00,
    type: "pickup",
    transmission: "manual",
    observations: "Passenger Door Repainted",
    image: hilux
  },
  {
    id: 14,
    plate: "QXU9G32",
    name: "L200 TRITON GL SPORT 4X4 MANUAL DIESEL",
    color: "BRANCO",
    year: 2020,
    kilometers: 199000,
    fipePrice: 120000.00,
    salePrice: 89990.00,
    type: "pickup",
    transmission: "manual",
    observations: "Capô/Caçamba LD/Tpa traseira repintada",
    image: l200
  },
  {
    id: 15,
    plate: "RMG3B92",
    name: "L200 TRITON GL SPORT 4X4 MANUAL DIESEL",
    color: "BRANCO",
    year: 2021,
    kilometers: 116000,
    fipePrice: 120000.00,
    salePrice: 99990.00,
    type: "pickup",
    transmission: "manual",
    observations: "Some Touch-ups, conferir no vídeo",
    image: l200
  },
  {
    id: 16,
    plate: "SHU8D83",
    name: "L200 TRITON GLS SPORT 4X4 AUTOMÁTICA DIESEL",
    color: "Mitsubishi",
    year: 2023,
    kilometers: 34936,
    fipePrice: 165131.00,
    salePrice: 119990.00,
    type: "pickup",
    transmission: "automática",
    observations: "No Touch-ups (Heavy Usage)",
    image: l200
  },
  {
    id: 17,
    plate: "SHU8D88",
    name: "L200 TRITON GLS SPORT 4X4 AUTOMÁTICA DIESEL",
    color: "Mitsubishi",
    year: 2023,
    kilometers: 29000,
    fipePrice: 165131.00,
    salePrice: 119990.00,
    type: "pickup",
    transmission: "automática",
    observations: "Portas e Para-lama LD repintados (Heavy Usage)",
    image: l200
  },
  {
    id: 18,
    plate: "SHU8D86",
    name: "L200 TRITON GLS SPORT 4X4 AUTOMÁTICA DIESEL",
    color: "Mitsubishi",
    year: 2023,
    kilometers: 35481,
    fipePrice: 165131.00,
    salePrice: 119990.00,
    type: "pickup",
    transmission: "automática",
    observations: "No Touch-ups (Heavy Usage)",
    image: l200
  },
  {
    id: 19,
    plate: "RVM7G96",
    name: "Onix Plus LT Turbo Manual 1.0",
    color: "Chevrolet",
    year: 2023,
    kilometers: 114000,
    fipePrice: 79562.00,
    salePrice: 66000.00,
    type: "sedan",
    transmission: "manual",
    observations: "Não da chave de roda traseira LD",
    image: onix
  },
  {
    id: 20,
    plate: "RVM7G94",
    name: "Onix Plus LT Turbo Manual 1.0",
    color: "Chevrolet",
    year: 2023,
    kilometers: 118000,
    fipePrice: 79562.00,
    salePrice: 66000.00,
    type: "sedan",
    transmission: "manual",
    observations: "No Touch-ups",
    image: onix
  },
  {
    id: 21,
    plate: "RVM7G95",
    name: "Onix Plus LT Turbo Manual 1.0",
    color: "Chevrolet",
    year: 2023,
    kilometers: 125000,
    fipePrice: 79562.00,
    salePrice: 66000.00,
    type: "sedan",
    transmission: "manual",
    observations: "No Touch-ups",
    image: onix
  },
  {
    id: 22,
    plate: "PYK9G21",
    name: "S10 LS MANUAL CABINE DUPLA 4X4 DIESEL",
    color: "BRANCO",
    year: 2017,
    kilometers: 154000,
    fipePrice: 114885.00,
    salePrice: 95000.00,
    type: "pickup",
    transmission: "manual",
    observations: "Capô e Left Side Repainted",
    image: s10
  },
  {
    id: 23,
    plate: "PYK7J43",
    name: "S10 LS MANUAL CABINE DUPLA 4X4 DIESEL",
    color: "Chevrolet",
    year: 2017,
    kilometers: 171000,
    fipePrice: 114885.00,
    salePrice: 95000.00,
    type: "pickup",
    transmission: "manual",
    observations: "Lateral LE da caçamba e capô repintados",
    image: s10
  },
  {
    id: 24,
    plate: "QWR1J34",
    name: "S10 LS MANUAL CABINE DUPLA 4X4 DIESEL",
    color: "Chevrolet",
    year: 2020,
    kilometers: 115000,
    fipePrice: 126588.00,
    salePrice: 109990.00,
    type: "pickup",
    transmission: "manual",
    observations: "Left Fender Repainted",
    image: s10
  },
  {
    id: 25,
    plate: "QWR6912",
    name: "S10 LS MANUAL CABINE DUPLA 4X4 DIESEL",
    color: "Chevrolet",
    year: 2020,
    kilometers: 135000,
    fipePrice: 126588.00,
    salePrice: 109990.00,
    type: "pickup",
    transmission: "manual",
    observations: "Para-lama LD e lateral da caçamba 2 lados repintados",
    image: s10
  },
  {
    id: 26,
    plate: "RNH2B15",
    name: "S10 LS MANUAL CABINE DUPLA 4X4 DIESEL",
    color: "Chevrolet",
    year: 2022,
    kilometers: 106000,
    fipePrice: 142474.00,
    salePrice: 115000.00,
    type: "pickup",
    transmission: "manual",
    observations: "Para-lama LD, capô, lateral da caçamba Ld repintada",
    image: s10
  },
  {
    id: 27,
    plate: "RNH2B01",
    name: "S10 LS MANUAL CABINE DUPLA 4X4 DIESEL",
    color: "Chevrolet",
    year: 2022,
    kilometers: 88000,
    fipePrice: 142474.00,
    salePrice: 115000.00,
    type: "pickup",
    transmission: "manual",
    observations: "Capô e Para-lama LD repintado",
    image: s10
  },
  {
    id: 28,
    plate: "RNN2J46",
    name: "S10 LS MANUAL CABINE DUPLA 4X4 DIESEL",
    color: "Chevrolet",
    year: 2022,
    kilometers: 98000,
    fipePrice: 142474.00,
    salePrice: 115000.00,
    type: "pickup",
    transmission: "manual",
    observations: "Lateral da caçamba LE repintada",
    image: s10
  },
  {
    id: 29,
    plate: "RUGUJ52",
    name: "Saveiro Robust CS 1.20cv",
    color: "Chevrolet",
    year: 2023,
    kilometers: 63000,
    fipePrice: 70542.00,
    salePrice: 59990.00,
    type: "pickup",
    transmission: "manual",
    observations: "Lateral da caçamba repintada",
    image: robust
  },
  {
    id: 30,
    plate: "RUH4J56",
    name: "Saveiro Robust CS 1.20cv",
    color: "Volkswagen",
    year: 2023,
    kilometers: 69000,
    fipePrice: 70542.00,
    salePrice: 62990.00,
    type: "pickup",
    transmission: "manual",
    observations: "No Touch-ups, tampa traseira amassada",
    image: robust
  },
  {
    id: 31,
    plate: "RND3G69",
    name: "Sprinter 416 van 16Lugares",
    color: "Mercedes Benz",
    year: 2020,
    kilometers: 299000,
    fipePrice: 217508.00,
    salePrice: 170000.00,
    type: "van",
    transmission: "manual",
    observations: "Retoque Capô/Para-lama LE/Vidro cx de roda traseiro LD",
    image: sprinter
  },
  {
    id: 32,
    plate: "LVF6471",
    name: "Sprinter 416 van 16Lugares",
    color: "Mercedes Benz",
    year: 2020,
    kilometers: 260000,
    fipePrice: 217508.00,
    salePrice: 170000.00,
    type: "van",
    transmission: "manual",
    observations: "No Touch-ups",
    image: sprinter
  },
  {
    id: 33,
    plate: "RVM3E04",
    name: "Strada 1.4 Endurance",
    color: "Fiat",
    year: 2023,
    kilometers: 118000,
    fipePrice: 77026.00,
    salePrice: 65000.00,
    type: "pickup",
    transmission: "manual",
    observations: "No Touch-ups",
    image: strada
  },
  {
    id: 34,
    plate: "RUW1F64",
    name: "Strada 1.4 Endurance",
    color: "Fiat",
    year: 2023,
    kilometers: 112000,
    fipePrice: 77026.00,
    salePrice: 65000.00,
    type: "pickup",
    transmission: "manual",
    observations: "No Touch-ups",
    image: strada
  },
  {
    id: 35,
    plate: "QWR8865",
    name: "Toro Endurance 4X4 diesel automática",
    color: "Fiat",
    year: 2020,
    kilometers: 79000,
    fipePrice: 104795.00,
    salePrice: 92990.00,
    type: "suv",
    transmission: "automática",
    observations: "No Touch-ups (Alguns arranhados na caçamba)",
    image: toro
  },
  {
    id: 36,
    plate: "QXG5414",
    name: "Toro Endurance 4X4 diesel automática",
    color: "Fiat",
    year: 2020,
    kilometers: 83000,
    fipePrice: 104795.00,
    salePrice: 92990.00,
    type: "suv",
    transmission: "automática",
    observations: "Caçamba repintada",
    image: toro
  },
  {
    id: 37,
    plate: "SHD4B12",
    name: "Toro FREEDOM 4X4 diesel automática",
    color: "Fiat",
    year: 2023,
    kilometers: 59000,
    fipePrice: 141188.00,
    salePrice: 112000.00,
    type: "suv",
    transmission: "automática",
    observations: "2 lados da caçamba e tampa traseira retocadas",
    image: toro
  },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  location: string;
  paymentMethod: string;
  message: string;
  requestType: 'buy' | 'rent';
}

// Add this type if not already present
type RequestType = 'buy' | 'rent';

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    location: '',
    paymentMethod: '',
    message: '',
    requestType: 'buy'
  });

  const [visibleCars, setVisibleCars] = useState<CarOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCar, setSelectedCar] = useState<CarOption | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [requestType, setRequestType] = useState<RequestType>('buy');

  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreCars();
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  const loadMoreCars = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const currentLength = visibleCars.length;
      const nextCars = carsData.slice(currentLength, currentLength + 6);
      if (nextCars.length > 0) {
        setVisibleCars(prev => [...prev, ...nextCars]);
      }
      if (currentLength + nextCars.length >= carsData.length) {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    // Initial load of first 6 cars
    const initialCars = carsData.slice(0, 6);
    setVisibleCars(initialCars);
    setHasMore(carsData.length > 6);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    title: '',
    message: '',
    type: 'success' as 'success' | 'error'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCar) return;

    setIsSubmitting(true);

    try {
      const templateParams = {
        request_type: formData.requestType.toUpperCase(), // 'BUY' or 'RENT'
        car_name: selectedCar.name,
        car_plate: selectedCar.plate,
        car_price: selectedCar.salePrice.toLocaleString('pt-BR'),
        car_year: selectedCar.year,
        car_color: selectedCar.color,
        car_km: selectedCar.kilometers.toLocaleString('pt-BR'),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        cpf: formData.cpf,
        location: formData.location,
        payment_method: formData.paymentMethod,
        message: formData.message
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setDialogConfig({
          title: 'Message Sent!',
          message: `Your ${formData.requestType} request has been sent successfully. We'll contact you soon.`,
          type: 'success'
        });
        setShowDialog(true);
        setShowBookingForm(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          cpf: '',
          location: '',
          paymentMethod: '',
          message: '',
          requestType: 'buy'
        });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setDialogConfig({
        title: 'Error',
        message: 'Unable to send your request. Please try again.',
        type: 'error'
      });
      setShowDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRentClick = (car: CarOption, type: 'buy' | 'rent') => {
    setSelectedCar(car);
    setRequestType(type);
    setShowBookingForm(true);
    setFormData(prev => ({
      ...prev,
      requestType: type,
      name: '',
      email: '',
      phone: '',
      cpf: '',
      location: '',
      paymentMethod: '',
      message: ''
    }));
  };

  const CarCard = ({ car }: { car: CarOption }) => {
    const buttons = [
      {
        id: `rent-${car.id}`,
        type: 'rent' as const,
        label: 'Rent Now',
        className: 'w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold transition-colors'
      },
      {
        id: `buy-${car.id}`,
        type: 'buy' as const,
        label: 'Buy Now',
        className: 'w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors'
      }
    ];

    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
        <div className="relative h-48">
          <img 
            src={car.image} 
            alt={car.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full">
            R$ {car.salePrice.toLocaleString('pt-BR')}
          </div>
          <div className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-1 rounded-full">
            {car.plate}
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold">{car.name}</h3>
              <p className="text-gray-600">{car.year} • {car.color}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">FIPE</p>
              <p className="font-semibold">R$ {car.fipePrice.toLocaleString('pt-BR')}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-gray-600">
              <Gauge className="w-5 h-5 mr-2" />
              {car.kilometers.toLocaleString('pt-BR')} km
            </div>
            <div className="flex items-center text-gray-600">
              <Car className="w-5 h-5 mr-2" />
              {car.transmission}
            </div>
          </div>
          
          {car.observations && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">{car.observations}</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            {buttons.map(button => (
              <button
                key={button.id}
                onClick={() => handleRentClick(car, button.type as RequestType)}
                className={button.className}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const Dialog = ({ title, message, type, onClose }: {
    title: string;
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
  }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center mb-4">
          {type === 'success' ? (
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <X className="w-6 h-6 text-red-600" />
            </div>
          )}
          <h3 className="text-xl font-semibold ml-4">{title}</h3>
        </div>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );

  // In your form rendering section, make sure each field has a unique key
  const formFields = [
    {
      id: 'name',
      label: 'Full Name',
      type: 'text',
      name: 'name',
      placeholder: 'Enter your full name',
      required: true
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      name: 'email',
      placeholder: 'your@email.com',
      required: true
    },
    {
      id: 'phone',
      label: 'Phone/WhatsApp',
      type: 'tel',
      name: 'phone',
      placeholder: '(00) 00000-0000',
      required: true
    },
    {
      id: 'cpf',
      label: 'Tax ID (CPF)',
      type: 'text',
      name: 'cpf',
      placeholder: '000.000.000-00',
      required: true
    },
    {
      id: 'location',
      label: 'City/State',
      type: 'text',
      name: 'location',
      placeholder: 'Enter your city and state',
      required: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Integrated Header */}
      <div 
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto px-4 h-full">
            {/* Logo in top-left corner */}
            <div className="pt-4">
              <img 
                src={logo} 
                alt="Company Logo" 
                className="h-24 w-auto"
              />
            </div>
            
            {/* Hero content */}
            <div className="h-[calc(100%-4rem)] flex items-center">
              <div className="text-white max-w-2xl">
                <h1 className="text-5xl font-bold mb-6">Premium Car Purchase/Rental Experience</h1>
                <p className="text-xl mb-8">Drive your dreams with our luxury fleet. Competitive rates, flexible pickup, and exceptional service.</p>
                <a href="#cars" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
                  View Our Fleet
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <Clock className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock assistance for your convenience</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Fully Insured</h3>
                <p className="text-gray-600">Comprehensive coverage for peace of mind</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Flexible Pickup</h3>
                <p className="text-gray-600">Multiple locations for your convenience</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Car Grid */}
      <div id="cars" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Premium Fleet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCars.map((car) => (
              <CarCard key={`car-${car.id}`} car={car} />
            ))}
          </div>
          
          {/* Loading Indicator */}
          {hasMore && (
            <div ref={loadingRef} className="flex justify-center items-center py-8">
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
                </div>
              ) : (
                <div className="h-8">
                  {/* Invisible element to trigger intersection observer */}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Booking Form */}
      {showBookingForm && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {requestType === 'buy' ? 'Purchase Request' : 'Rental Request'}
                </h2>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={selectedCar.image} 
                      alt={selectedCar.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{selectedCar.name}</h3>
                      <p className="text-gray-600">{selectedCar.year} • {selectedCar.color}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Gauge className="w-4 h-4 mr-1" />
                          {selectedCar.kilometers.toLocaleString('pt-BR')} km
                        </div>
                        <div className="flex items-center">
                          <Car className="w-4 h-4 mr-1" />
                          {selectedCar.transmission}
                        </div>
                      </div>
                      <p className="mt-2 font-semibold text-blue-600">
                        R$ {selectedCar.salePrice.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowBookingForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {formFields.map((field) => (
                  <div key={`form-${field.id}`}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData[field.name as keyof FormData]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <select
                  name="paymentMethod"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="">Select a payment method</option>
                  <option value="cash">Bank Transfer</option>
                  <option value="financing">Financing</option>
                  <option value="consortium">Installment Payment</option>
                  <option value="trade">Trade-in</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Type your message or questions about the vehicle..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </>
                ) : (
                  'Submit Request'
                )}
              </button>
              <p className="text-sm text-gray-500 text-center mt-4">
                Ao enviar, você concorda em receber contato sobre este veículo
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <img 
                src={footerLogo} 
                alt="Company Logo" 
                className="h-24 w-auto mb-4"
              />
              <div className="space-y-2">
                <p className="flex items-center"><Phone className="w-5 h-5 mr-2" /> +55 11 99999-9999</p>
                <p className="flex items-center"><Mail className="w-5 h-5 mr-2" /> admin@loucoporleilos.com</p>
                <p className="flex items-center"><MapPin className="w-5 h-5 mr-2" /> Goiânia, Goiás Rua C-83</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Business Hours</h3>
              <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
              <p>Saturday: 9:00 AM - 6:00 PM</p>
              <p>Sunday: 10:00 AM - 4:00 PM</p>
            </div>
            {/* 
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
              </ul>
            </div>
            */}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; 2025 Loucoporleilos. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {showDialog && (
        <Dialog
          title={dialogConfig.title}
          message={dialogConfig.message}
          type={dialogConfig.type}
          onClose={() => setShowDialog(false)}
        />
      )}
    </div>
  );
}

export default App;