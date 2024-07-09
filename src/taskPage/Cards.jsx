import React from 'react';
import chart_img from '../asset/Property 1=linear, Property 2=chart.svg';
import briefcase from '../asset/Property 1=linear, Property 2=briefcase.svg';
import clock from '../asset/Property 1=linear, Property 2=clock.svg';
import user from '../asset/Property 1=linear, Property 2=user.svg';

const cardData = [
    { name: 'Total Revenue', id: '1234', source: '$53,00989', image: chart_img },
    { name: 'Project', id: '5678', source: '95/100', image: briefcase },
    { name: 'Time Spent', id: '9101', source: '1022/1300 Hrs', image: clock },
    { name: 'Resources', id: '1121', source: '102/120', image: user }
];

const Card = ({ name, id, source, image }) => {
    const [firstPart, secondPart] = source.split('/');
    
    // const handleClick = () => {
    //     const card = document.getElementsByClassName('card-container');
    //     console.log(card);
    //     if (card) {
    //         window.print();
    //     }
    // }

    return (
        <div className='card-container ms-5'>
            <button className='card-section1 ms-3 mt-3'>
                <img src={image} alt='card-icon' className=''></img>
            </button>
            <div className='ms-3 mt-4'>
                <div className='card-section2-div1'>
                    <p className='card-details-value'>{name}</p>
                </div>  
                <div className='card-details'>
                    <p className='card-details-value'>
                        <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{firstPart}</span>
                        <span style={{ fontSize: '14px' }}>/{secondPart}</span>
                    </p>
                </div>
                <div className='card-details-id'>
                    <p className='card-details-value'>{id}</p>
                </div>
            </div>
        </div>
    );
}

const CardList = () => {
    return (
        <div className='card-data'>
            {cardData.map((card, index) => (
                <Card 
                    key={index} 
                    name={card.name} 
                    // id={card.id} 
                    source={card.source} 
                    image={card.image} 
                />
            ))}
        </div>
    );
}

export default CardList;
