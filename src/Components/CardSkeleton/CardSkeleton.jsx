import React from 'react'
import Skeleton from 'react-loading-skeleton'

const CardSkeleton = ({cards}) => {

  return Array(cards).fill(0).map((_,i) => <div className="card-skeleton" key={i}>
      <div className="left-col">
        <Skeleton height={140} />
      </div>
      <div className="right-col">
      <Skeleton count={3} height={32}/>
      </div>
    </div>
  )

    
}

export default CardSkeleton