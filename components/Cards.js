import React, { useState } from 'react'
import { format } from 'date-fns';

import Image from 'next/image';
import checkIcon from "../public/check.svg";
import deleteIcon from "../public/delete.svg";
import editIcon from "../public/edit.svg";
import controller from "../public/controller.svg";

import Game from './Game.js'

export default function Cards({allCards, card, edit, edittedValue, setEdittedValue, handleEditCard, handleAddEdit, handleDelete}) {

  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const currentDate = new Date();
  const formattedDate = format(currentDate, 'dd/MM');
  const gameOn = formattedDate >= allCards[card].timeCard

  return (
    <div className="block max-w-xs rounded-lg p-4 shadow-sm shadow-gray-500">
      <p className="text-center text-2xl font-semibold">{allCards[card].word}</p>
      <Image
        alt="Home"
        src={allCards[card].image}
        width={200}
        height={300}
        className="max-h-44 max-w-52 rounded-md object-cover"
      />
      <div className="mt-2">
        <div className='flex-1 flex'>
          {!(edit === card) ? (
            <>
              <div className="flex">
                <p className="text-gray-700">Proxima revisão: <span className="font-medium text-gray-900">{allCards[card].timeCard}</span></p>
              </div>
            </>
          ) : (
            <div className="flex flex-col">
              <input 
                className='font-medium w-full rounded-md border border-gray-500 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600' 
                value={edittedValue.word} 
                onChange={(e) => setEdittedValue({ ...edittedValue, word: e.target.value })} 
              />
              <input 
                className='font-medium w-full rounded-md border border-gray-500 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600' 
                value={edittedValue.translation} 
                onChange={(e) => setEdittedValue({ ...edittedValue, translation: e.target.value })} 
              />
            </div>
          )}       
        </div>

        <div className='mt-6 flex items-center justify-center'>
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 overflow-hidden rounded-md border bg-white shadow-sm">
            {(edit === card) ? <button onClick={handleEditCard} className="inline-block border-e p-3 text-gray-700 hover:bg-green-500 focus:relative hover:scale-125 duration-300 shadow-gray-500">
              <Image
              src={checkIcon}
              width={20}
              height={20}
              alt="Picture of the author"
              />
            </button> : <button onClick={handleAddEdit(card)} className="inline-block border-e p-3 text-gray-700 hover:bg-yellow-400 focus:relative hover:scale-125 duration-300 shadow-gray-500">
              <Image
              src={editIcon}
              width={20}
              height={20}
              alt="Picture of the author"
              />
            </button>}
          </div>

          <div className="mr-2 sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 overflow-hidden rounded-md border bg-white shadow-sm">
            <button onClick={handleDelete(card)} className="inline-block border-e p-3 text-gray-700 hover:bg-red-500 focus:relative hover:scale-125 duration-300 shadow-gray-500">
              <Image
              src={deleteIcon}
              width={20}
              height={20}
              alt="Picture of the author"
              />
            </button>
          </div>
          <span
            aria-hidden="true"
            className="mr-2 block h-10 w-px rounded-full bg-gray-500"
          ></span>
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 overflow-hidden rounded-md border bg-white shadow-sm">
            <button
              className={`inline-block border-e p-3 text-gray-700 hover:bg-orange-400 focus:relative hover:scale-125 duration-300 shadow-gray-500 ${gameOn ? 'cursor-pointer' : 'cursor-not-allowed'} `}
              disabled={!gameOn}
              onClick={openModal}
            >
              <Image
              src={controller}
              width={20}
              height={20}
              alt="Picture of the author"
              />
            </button>
            <Game isOpen={modalOpen} onClose={closeModal} originalWord={allCards[card].word} translatedWord={allCards[card].translation} imageUrl={allCards[card].image}/>
          </div>
        </div>
      </div>
    </div>
  )
}