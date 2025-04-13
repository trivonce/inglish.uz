import React from 'react'
import { useParams } from 'react-router-dom'

export default function IeltsSpeakingResult() {
    const { id } = useParams();

  return (
    <div>IeltsSpeakingResult {id}</div>
  )
}
