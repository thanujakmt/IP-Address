
import { useState, useEffect, useRef } from 'react'
import './App.css'
import axios from 'axios'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { LuLoader2 } from "react-icons/lu";
import { RiLoaderLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";

const UpdateMapCenter = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);
  return null;
};

function App() {

  const [data, setData] = useState()
  const [loading,setLoading] = useState(false)
  const inputIp = useRef()

  const fetchData = async () => {
    try {
      let ip = inputIp.current.value ? inputIp.current.value : '32.115.105.0'
     
      const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
      if (!ipRegex.test(ip)){
        alert('Invalid IP Address');
        return
      }
      setLoading(true)
      
      const response2 = await axios.get(`https://freeipapi.com/api/json/${ip}`)
      const response2Data = response2.data
      setData(response2Data)
      setLoading(false)
    } catch (e){
      console.log('Somethin went wrong')
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
          <div onClick={async (e) => fetchData()} className='bg-black py-5 text-white text-[18px] px-5 rounded-r-[15px] cursor-pointer hover:bg-Very_Dark_Gray'>
            
          {loading?<LuLoader2 className=' animate-spin' />:<IoIosArrowForward   />}
            </div> 
        </div>
      </div>
      <div className='  flex items-center justify-center font-font_rubin '>
        <div className='md:flex-row flex flex-col items-center justify-center  z-10 bg-white md:gap-10 gap-4 top-[210px] h-[300px] w-[320px] md:w-[750px] lg:w-[900px] 2xl:w-[1100px] md:h-[180px] px-10 shadow-2xl rounded-[15px] absolute'>
          <div className= ' justify-evenly w-[250px] md:w-[250px] px-1 flex flex-col items-center md:items-left  md:h-[100px] md:border-Dark_Gray md:border-r'>
            <p className=' text-Dark_Gray text-[0.8em] font-[600] tracking-wide'>IP ADDRESS</p>
            <p className=' font-[500] text-[1.2em] md:text-[1.6em] text-Very_Dark_Gray '>{data ? data.ipAddress : <RiLoaderLine  className='animate-spin'/>}</p>
          </div>
          <div className='justify-evenly  w-[250px] md:w-[250px] px-1 flex flex-col items-center md:items-left  md:h-[100px] md:border-Dark_Gray md:border-r'>
            <p className=' text-Dark_Gray text-[0.8em] font-[600] tracking-wide'>LOCATION</p>
            <p className=' font-[500] text-[1.2em] md:text-[1.6em] text-Very_Dark_Gray text-center '>{data ? `${data.regionName}, ${data.countryCode} ,${data.zipCode}` : <RiLoaderLine  className='animate-spin'/>}</p>
          </div>
          <div className='justify-evenly  w-[250px] md:w-[250px] px-1 flex flex-col items-center md:items-left  md:h-[100px] md:border-Dark_Gray md:border-r'>
            <p className=' text-Dark_Gray text-[0.8em] font-[600] tracking-wide'>TIMZONE</p>
            <p className=' font-[500] text-[1.2em] md:text-[1.6em] text-Very_Dark_Gray '>{data ? data.timeZone : <RiLoaderLine  className='animate-spin'/>}</p>
          </div>
          <div className='justify-evenly  w-[250px] md:w-[250px] px-1 flex flex-col items-center md:items-left  md:h-[100px]'>
            <p className=' text-Dark_Gray text-[0.8em] font-[600] tracking-wide'>Currency</p>
            <p className=' font-[500] text-[1.2em] md:text-[1.6em] text-Very_Dark_Gray '> {data ? data.currency.name : <RiLoaderLine  className='animate-spin'/>}</p>
          </div>
        </div>
      </div>
      <div className=' h-[600px]  w-full' >
        <MapContainer className=' z-0 ' center={data?[data.latitude, data.longitude]:[40.71427,-74.00597]} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <UpdateMapCenter position={data?[data.latitude, data.longitude]:[40.71427,-74.00597]} />
          <Marker  position={data?[data.latitude, data.longitude]:[40.71427,-74.00597]}>
            <Popup>
              {`${data ? `${data.regionName}, ${data.countryCode} ,${data.zipCode}` : <RiLoaderLine  className='animate-spin'/>}`}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  )
}

export default App
