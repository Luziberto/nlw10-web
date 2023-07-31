"use client"
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import iconCheckImg from '../assets/icon-check.svg'
import logoImg from '../assets/logo.svg'
import avatarsImg from '../assets/users-avatar-example.png'
import Image from 'next/image'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'

export default async function Home() {

  const [poolCountResult, guessCountResult] = await Promise.all([getPoolsCount(), getGuessCount()]);
  
  // const [poolTitle, setPoolTitle] = useState('')
  
  const createPool = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const response = api.post('/pools', {
        title: '2'
      })  

      const { code } = response.data

      await navigator.clipboard.writeText(code)

      alert('Boão criado com sucesso, o código foi copiado para a área de transferência!')
    } catch (error) {
      console.log(error)
      alert('Falha ao criar o bolão, tente novamente!')
    } 
    
  }
  
  return (
    <div className="flex flex-col items-center md:items-start md:justify-center max-w-[1124px] p-4 h-screen md:mx-auto">
      <Image src={logoImg} />
      <div className="flex flex-col md:grid md:grid-cols-2 p-2">
        <main>
          <div className="flex flex-col col-span-10 col-start-2 gap-4">
            <div className="flex flex-col gap-12 pt-12">
              <h1 className="text-5xl inline-block text-white font-bold">Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>
              <div className="flex items-center gap-2">
                <Image src={avatarsImg} />
                <strong className="text-gray-100 text-xl">
                  <span className="text-ignite-500">+12.592</span> pessoas já estão usando
                </strong>
              </div>
              <div className="flex flex-col gap-2">
                <form onSubmit={createPool} className="flex gap-2">
                  {/* <input onChange={ event => setPoolTitle(event.target.value)} className="text-white flex-1 p-4 rounded-sm bg-gray-800 border border-gray-600 text-sm focus:border-gray-300" placeholder="Qual nome do seu bolão?" /> */}
                  <input className="text-white flex-1 p-4 rounded-sm bg-gray-800 border border-gray-600 text-sm focus:border-gray-300" placeholder="Qual nome do seu bolão?" />
                  <button type="submit" className="p-4 text-sm rounded-sm bg-yellow-500 font-bold text-gray-900 uppercase hover:bg-yellow-700">Criar meu bolão</button>
                </form>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Após criar seu bolão, você receberá um código único que<br />
                  poderá usar para convidar outras pessoas
                </p>
              </div>
              
              <div className="flex gap-4 border-t border-gray-600 justify-between divide-x divide-gray-600 pt-8">
                <div className="flex gap-2">
                  <Image src={iconCheckImg} />
                  <div className="flex-1">
                    <p className="text-white">+{poolCountResult}</p>
                    <p className="text-white">Bolões criado</p>
                  </div>
                </div>
                <div className="flex pl-auto w-1/2 justify-end gap-2">
                  <Image src={iconCheckImg} />
                  <div>
                    <p className="text-white">+{guessCountResult}</p>
                    <span className="text-white">Palpites enviados</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Image className="order-first md:order-last mx-auto" src={ appPreviewImg } alt="Dois celulares exibindo uma prévia da aplicação móvel da NLW Copa"/>
      </div>
    </div>
  )
}



export const getPoolsCount = async (): Promise<number> => {
  const poolCountResponse = await api.get('pools/count')
  const { pools } = poolCountResponse.data
  return pools
}

export const getGuessCount = async (): Promise<number> => {
  const guessCountResponse = await api.get('guesses/count')
  const { guesses } = guessCountResponse.data
  return guesses
}