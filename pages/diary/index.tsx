import React from 'react'
import {Layout} from '@components/common';
import {Repository} from "@hooks/repository";

export default function Diary() {
  const data = Repository.getUserPosts();
  return (
        <div>Diary</div>
  )
}
