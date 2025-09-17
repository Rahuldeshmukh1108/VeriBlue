"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  Thermometer,
  Droplets,
  Wind,
  Zap,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wifi,
  WifiOff,
  TreePine,
  Gauge,
} from "lucide-react"

interface IoTSensor {
  id: string
  name: string
  type: string
  location: string
  status: "online" | "offline" | "warning"
  lastReading: string
  value: number
  unit: string
  icon: any
  threshold: { min: number; max: number }
}

interface MRVData {
  carbonSequestration: number
  energyGeneration: number
  waterUsage: number
  biodiversityIndex: number
  soilHealth: number
}

export function IoTMonitoringDashboard({ projectId }: { projectId: string }) {
  const [sensors, setSensors] = useState<IoTSensor[]>([])
  const [mrvData, setMrvData] = useState<MRVData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { success, error } = useToast()

  useEffect(() => {
    const loadSensorData = async () => {
      try {
        // Simulate IoT sensor data loading
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockSensors: IoTSensor[] = [
          {
            id: "temp_001",
            name: "Temperature Sensor",
            type: "temperature",
            location: "Zone A",
            status: "online",
            lastReading: "2 minutes ago",
            value: 24.5,
            unit: "°C",
            icon: Thermometer,
            threshold: { min: 15, max: 35 },
          },
          {
            id: "humid_001",
            name: "Humidity Sensor",
            type: "humidity",
            location: "Zone A",
            status: "online",
            lastReading: "1 minute ago",
            value: 68,
            unit: "%",
            icon: Droplets,
            threshold: { min: 40, max: 80 },
          },
          {
            id: "co2_001",
            name: "CO2 Monitor",
            type: "co2",
            location: "Zone B",
            status: "warning",
            lastReading: "5 minutes ago",
            value: 420,
            unit: "ppm",
            icon: Wind,
            threshold: { min: 300, max: 500 },
          },
          {
            id: "energy_001",
            name: "Energy Meter",
            type: "energy",
            location: "Solar Array",
            status: "online",
            lastReading: "30 seconds ago",
            value: 1250,
            unit: "kWh",
            icon: Zap,
            threshold: { min: 0, max: 2000 },
          },
          {
            id: "soil_001",
            name: "Soil Moisture",
            type: "soil",
            location: "Zone C",
            status: "offline",
            lastReading: "2 hours ago",
            value: 45,
            unit: "%",
            icon: TreePine,
            threshold: { min: 30, max: 70 },
          },
        ]

        const mockMRVData: MRVData = {
          carbonSequestration: 2.4, // tons CO2/day
          energyGeneration: 1250, // kWh/day
          waterUsage: 850, // liters/day
          biodiversityIndex: 0.78, // 0-1 scale
          soilHealth: 0.85, // 0-1 scale
        }

        setSensors(mockSensors)
        setMrvData(mockMRVData)
        setIsLoading(false)

        success("IoT Data Loaded", "Real-time monitoring data updated successfully")
      } catch (err) {
        error("Failed to load sensor data", "Please check your IoT connections")
        setIsLoading(false)
      }
    }

    loadSensorData()

    // Set up real-time updates
    const interval = setInterval(() => {
      setSensors((prev) =>
        prev.map((sensor) => ({
          ...sensor,
          value: sensor.value + (Math.random() - 0.5) * 2,
          lastReading: "Just now",
        })),
      )
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [projectId, success, error])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800 border-green-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "offline":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "offline":
        return <WifiOff className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* MRV Summary */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center">
              <TreePine className="h-4 w-4 mr-2" />
              Carbon Sequestration
            </CardDescription>
            <CardTitle className="text-2xl text-green-600">{mrvData?.carbonSequestration} t/day</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={75} className="h-2" />
            <p className="text-sm text-muted-foreground mt-1">75% of target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              Energy Generation
            </CardDescription>
            <CardTitle className="text-2xl text-blue-600">{mrvData?.energyGeneration} kWh</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={62} className="h-2" />
            <p className="text-sm text-muted-foreground mt-1">62% of capacity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center">
              <Droplets className="h-4 w-4 mr-2" />
              Water Usage
            </CardDescription>
            <CardTitle className="text-2xl text-cyan-600">{mrvData?.waterUsage} L/day</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={85} className="h-2" />
            <p className="text-sm text-muted-foreground mt-1">Within limits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              Biodiversity Index
            </CardDescription>
            <CardTitle className="text-2xl text-purple-600">{mrvData?.biodiversityIndex}</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={78} className="h-2" />
            <p className="text-sm text-muted-foreground mt-1">Good diversity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center">
              <Gauge className="h-4 w-4 mr-2" />
              Soil Health
            </CardDescription>
            <CardTitle className="text-2xl text-orange-600">{mrvData?.soilHealth}</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={85} className="h-2" />
            <p className="text-sm text-muted-foreground mt-1">Excellent health</p>
          </CardContent>
        </Card>
      </div>

      {/* IoT Sensors Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sensors.map((sensor) => {
          const Icon = sensor.icon
          const isWithinThreshold = sensor.value >= sensor.threshold.min && sensor.value <= sensor.threshold.max

          return (
            <Card key={sensor.id} className="relative">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription className="flex items-center">
                    <Icon className="h-4 w-4 mr-2" />
                    {sensor.name}
                  </CardDescription>
                  <Badge className={getStatusColor(sensor.status)}>
                    {getStatusIcon(sensor.status)}
                    <span className="ml-1 capitalize">{sensor.status}</span>
                  </Badge>
                </div>
                <CardTitle className="text-2xl flex items-baseline">
                  {sensor.value.toFixed(1)}
                  <span className="text-sm font-normal text-muted-foreground ml-1">{sensor.unit}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      Range: {sensor.threshold.min}-{sensor.threshold.max} {sensor.unit}
                    </span>
                    <span className={isWithinThreshold ? "text-green-600" : "text-red-600"}>
                      {isWithinThreshold ? "Normal" : "Alert"}
                    </span>
                  </div>
                  <Progress value={(sensor.value / sensor.threshold.max) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{sensor.location}</span>
                    <span>{sensor.lastReading}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wifi className="h-5 w-5 mr-2" />
            System Status
          </CardTitle>
          <CardDescription>IoT network and data collection status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {sensors.filter((s) => s.status === "online").length}
              </div>
              <div className="text-sm text-muted-foreground">Sensors Online</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {sensors.filter((s) => s.status === "warning").length}
              </div>
              <div className="text-sm text-muted-foreground">Warnings</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {sensors.filter((s) => s.status === "offline").length}
              </div>
              <div className="text-sm text-muted-foreground">Offline</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
