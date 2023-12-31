import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image';

import Crud from '../hooks/crud.js'
import Cards from './Cards'
import AddCards from './AddCards.js'
import Menu from './Menu'

import refresh from "../public/refresh.svg";

export default function Dashboard() {

  const { 
  	word, 
  	setWord, 
  	translation, 
  	setTranslation, 
  	handleButtonClick, 
  	loading, 
  	allCards, 
    allActivities,
  	edit, 
  	edittedValue,
  	setEdittedValue, 
  	handleEditCard, 
  	handleAddEdit, 
  	handleDelete 
  } = Crud()

  return (
    <>
      <Head>
        <title>App|Relembra.ai</title>
        <link rel="icon" href="https://raw.githubusercontent.com/FelipeFerreiraSS/app-memorizacao/main/public/icoLogo.ico" />
      </Head>
      <Menu 
        allActivities={allActivities}
      />
      <div className='w-full max-w-5xl text-xs sm:text-sm mx-auto flex flex-col flex-1 gap-3 sm:gap-5'>
        <AddCards 
        	word={word}
        	setWord={setWord}
        	translation={translation}
        	setTranslation={setTranslation}
        	handleButtonClick={handleButtonClick}
        />
        {loading ? (
          <div className='flex-1 grid place-items-center'>
            <Image
              className='animate-spin'
              src={refresh}
              width={30}
              height={30}
              alt="Picture of the author"
            />
          </div>
        ) : (
          <>
            {Object.keys(allCards).length === 0 ? (
              <div className="w-2/5 m-auto rounded-xl border border-gray-300 bg-white p-4 shadow-xl">
                <strong className="block font-medium text-gray-900"> Nenhum cartão adicionado ainda </strong>
                <p className="mt-1 text-sm text-gray-700">
                  Utilize os comandos acima para adicionar um novo cartão.
                </p>
              </div>
            ) : (
              <div className='m-auto mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:mt-0 lg:grid-cols-4 lg:gap-8'>
                {Object.keys(allCards).map((card, i) => {
                  return (
                    <Cards 
                      key={i.toString()}
                      allCards={allCards}
                      card={card}
                      edit={edit}
                      edittedValue={edittedValue}
                      setEdittedValue={setEdittedValue}
                      handleEditCard={handleEditCard}
                      handleAddEdit={handleAddEdit}
                      handleDelete={handleDelete}
                    />
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}