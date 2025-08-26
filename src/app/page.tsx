'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function HomePage() {
  const [name, setName] = useState('')
  const [greeting, setGreeting] = useState('')
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      let timeOfDay = 'day'
      
      if (hours < 12) {
        timeOfDay = 'morning'
      } else if (hours < 17) {
        timeOfDay = 'afternoon'
      } else {
        timeOfDay = 'evening'
      }
      
      setCurrentTime(timeOfDay)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute
    
    return () => clearInterval(interval)
  }, [])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
    
    if (newName.trim()) {
      setGreeting(`Good ${currentTime}, ${newName.trim()}! 🌟`)
    } else {
      setGreeting('')
    }
  }

  const handleGreetClick = () => {
    if (name.trim()) {
      setGreeting(`Hello there, ${name.trim()}! Welcome to our greeting app! ✨`)
    }
  }

  const resetGreeting = () => {
    setName('')
    setGreeting('')
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome! 👋
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Let's get to know you better
          </p>
        </div>

        <Card className="shadow-xl backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-gray-800 dark:text-white">
              Greeting App
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                What's your name?
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name here..."
                value={name}
                onChange={handleNameChange}
                className="text-lg py-3 px-4 border-2 focus:border-red-500 transition-colors"
                autoComplete="name"
              />
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleGreetClick}
                disabled={!name.trim()}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Greet Me! 🎉
              </Button>
              
              {(name || greeting) && (
                <Button 
                  onClick={resetGreeting}
                  variant="outline"
                  className="py-3 px-4 border-2 hover:bg-gray-50 transition-colors"
                >
                  Reset
                </Button>
              )}
            </div>

            {greeting && (
              <div className="mt-6 p-6 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-lg border border-red-200 dark:border-red-700 animate-in fade-in-0 slide-in-from-bottom-4">
                <p className="text-xl font-semibold text-center text-gray-800 dark:text-white">
                  {greeting}
                </p>
                <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-2">
                  Nice to meet you! 😊
                </p>
              </div>
            )}

            {!greeting && !name && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                <p className="text-sm">
                  Type your name above to see a personalized greeting
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Built with Next.js, Tailwind CSS, and shadcn/ui
          </p>
        </div>
      </div>
    </div>
  )
}