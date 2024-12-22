import { useState, useEffect } from 'react'
import { Utensils } from 'lucide-react'
import QRModal from './QRModal'
import { authService } from '../../services/api'
import { useAuth } from '../../contexts/AuthContext'

export default function Food() {
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [qrCode, setQrCode] = useState(null)
  const { user } = useAuth()
  const meals = ['breakfast', 'lunch', 'snacks', 'dinner']

  const handleMealSelect = async (meal) => {
    try {
      const response = await authService.getQRForFood(meal)
      setQrCode(response.data)
      setSelectedMeal(meal)
    } catch (error) {
      console.error('Error fetching QR code for food:', error)
    }
  }

  const isMealTaken = (meal) => {
    return user?.food?.[meal] === 1
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-[#191E29]">
      <div className="max-w-4xl mx-auto border-2 border-[#01C38D] rounded-lg p-4 sm:p-8 bg-[#132D46]">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 flex items-center font-tt-commons">
          <Utensils className="mr-2 sm:mr-4 h-8 w-8 sm:h-10 sm:w-10 text-[#01C38D]" />
          Food
        </h1>
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {meals.map((meal) => (
            <div 
              key={meal} 
              className={`bg-[#191E29] p-4 sm:p-6 rounded-lg text-center border-2 ${
                isMealTaken(meal) ? 'border-[#696E79]' : 'border-[#01C38D]'
              }`}
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4 font-tt-commons capitalize">
                {meal}
              </h2>
              <div 
                className={`w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-lg flex items-center justify-center cursor-pointer ${
                  isMealTaken(meal) 
                    ? 'bg-[#696E79] cursor-not-allowed' 
                    : 'bg-[#132D46] hover:bg-[#01C38D] transition-colors'
                }`}
                onClick={() => !isMealTaken(meal) && handleMealSelect(meal)}
              >
                <span className="text-white font-poppins">
                  {isMealTaken(meal) ? 'Already Taken' : 'Get QR Code'}
                </span>
              </div>
              <p className="mt-3 sm:mt-4 text-[#696E79] font-poppins">
                {isMealTaken(meal) ? 'Meal taken' : `Scan for ${meal}`}
              </p>
            </div>
          ))}
        </div>
      </div>
      {selectedMeal && qrCode && (
        <QRModal 
          isOpen={!!selectedMeal} 
          onClose={() => setSelectedMeal(null)} 
          title={`QR Code for ${selectedMeal}`}
          qrValue={qrCode}
          theme={{
            bg: '#132D46',
            border: '#01C38D',
            text: '#FFFFFF'
          }}
        />
      )}
    </div>
  )
}