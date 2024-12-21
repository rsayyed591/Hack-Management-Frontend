import { useState } from 'react'
import { Utensils } from 'lucide-react'
import QRModal from './QRModal'

export default function Food() {
  const [selectedMeal, setSelectedMeal] = useState(null)
  const meals = ['Breakfast', 'Lunch', 'Snacks', 'Dinner']

  return (
    <div className="min-h-screen p-4 md:p-8 bg-white">
      <div className="max-w-4xl mx-auto border-2 border-black rounded-lg p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-6 sm:mb-8 flex items-center font-orbitron">
          <Utensils className="mr-2 sm:mr-4 h-8 w-8 sm:h-10 sm:w-10" />
          Food
        </h1>
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {meals.map((meal) => (
            <div key={meal} className="bg-gray-100 p-4 sm:p-6 rounded-lg text-center border-2 border-black">
              <h2 className="text-xl sm:text-2xl font-semibold text-black mb-3 sm:mb-4 font-orbitron">{meal}</h2>
              <div 
                className="w-32 h-32 sm:w-40 sm:h-40 mx-auto bg-white border-2 border-black rounded-lg flex items-center justify-center cursor-pointer"
                onClick={() => setSelectedMeal(meal)}
              >
                <span className="text-gray-800 font-poppins">QR Code</span>
              </div>
              <p className="mt-3 sm:mt-4 text-black font-poppins">Scan for {meal.toLowerCase()}</p>
            </div>
          ))}
        </div>
      </div>
      {selectedMeal && (
        <QRModal 
          isOpen={!!selectedMeal} 
          onClose={() => setSelectedMeal(null)} 
          title={`QR Code for ${selectedMeal}`}
          qrValue={`food-${selectedMeal.toLowerCase()}`}
        />
      )}
    </div>
  )
}