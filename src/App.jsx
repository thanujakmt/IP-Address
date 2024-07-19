
import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

function App() {

  const [data, setData] = useState()
  const inputIp = useRef()

  const fetchData = async () => {
    try {
      let ip = inputIp.current.value ? inputIp.current.value : '32.115.105.0'
      // at_LJRNbaX3nQwN124gwI8sdc11DCVvV

      const response2 = await axios.get('http://ip-api.com/json/122.172.84.108')
      const response2Data = response2.data
      console.log(response2Data)
      const response = await axios.get(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_LJRNbaX3nQwN124gwI8sdc11DCVvV=${ip}`);
      
      const responseData = await response.data
      setData(responseData)
      console.log(responseData)
    } catch (e){
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className="md:bg-[url('/images/pattern-bg-desktop.png')] bg-[url('/images/pattern-bg-mobile.png')] w-screen h-80 bg-cover bg-no-repeat flex flex-col gap-8 pt-8 items-center font-font_rubin relative ">
        <h1 className=' text-white font-[500] text-[2.1em]'>IP Address Tracker</h1>
        <div className="search_btn flex items-center justify-center shadow-lg">
          <input type="text" ref={inputIp} placeholder='Search for any IP address or domain' className=' px-5 md:w-[500px] h-14 rounded-l-[15px] outline-none md:text-[1.3em] cursor-pointer' />
          <img src="/images/icon-arrow.svg" onClick={async (e) => fetchData()} className='bg-black py-5 px-5 rounded-r-[15px] cursor-pointer hover:bg-Very_Dark_Gray' alt="" />
        </div>
      </div>
      <div className='z-10 flex items-center justify-center font-font_rubin'>
        <div className='md:flex-row flex flex-col items-center justify-center bg-white md:gap-10 gap-4 top-[210px] h-[430px] w-[320px] md:w-[750px] lg:w-[900px] 2xl:w-[1100px] md:h-[180px] px-10 shadow-2xl rounded-[15px] absolute'>
          <div className='w-[250px] md:w-[250px] px-1 flex flex-col items-center md:items-left  md:h-[100px] md:border-Dark_Gray md:border-r'>
            <p className=' text-Dark_Gray text-[0.8em] font-[600] tracking-wide'>IP ADDRESS</p>
            <p className=' font-[500] text-[1.6em] text-Very_Dark_Gray '>{data ? data.ip : 'Loader...'}</p>
          </div>
          <div className='w-[250px] md:w-[250px] px-1 flex flex-col items-center md:items-left  md:h-[100px] md:border-Dark_Gray md:border-r'>
            <p className=' text-Dark_Gray text-[0.8em] font-[600] tracking-wide'>LOCATION</p>
            <p className=' font-[500] text-[1.6em] text-Very_Dark_Gray text-center '>{`${data ? `${data.location.region}, ${data.location.country} ,${data.location.postalCode}` : 'Loader...'}`}</p>
          </div>
          <div className='w-[250px] md:w-[250px] px-1 flex flex-col items-center md:items-left  md:h-[100px] md:border-Dark_Gray md:border-r'>
            <p className=' text-Dark_Gray text-[0.8em] font-[600] tracking-wide'>TIMZONE</p>
            <p className=' font-[500] text-[1.6em] text-Very_Dark_Gray '>{data ? data.location.timezone : 'Loader...'}</p>
          </div>
          <div className='w-[250px] md:w-[250px] px-1 flex flex-col items-center md:items-left  md:h-[100px]'>
            <p className=' text-Dark_Gray text-[0.8em] font-[600] tracking-wide'>ISP</p>
            <p className=' font-[500] text-[1.6em] text-Very_Dark_Gray '> {data ? data.isp : 'Loader...'}</p>
          </div>
        </div>
      </div>
      <div className=' -z-10 h-[600px] w-full' >
        <MapContainer center={data?[data.location.lat, data.location.lng]:[40.71427,-74.00597]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={data?[data.location.lat, data.location.lng]:[40.71427,-74.00597]}>
            <Popup>
              {`${data ? `${data.location.region}, ${data.location.country} ,${data.location.postalCode}` : 'Loader...'}`}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  )
}

export default App
