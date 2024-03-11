import React from 'react';

interface CardProps {
    title: string;
    description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
    return (
        <div className="card">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

const CardList: React.FC = () => {
    const cards = [
        { title: 'Card 1', description: 'This is the first card' },
        { title: 'Card 2', description: 'This is the second card' },
        { title: 'Card 3', description: 'This is the third card' },
    ];

    return (
        <div className="card-list">
            {cards.map((card, index) => (
                <Card key={index} title={card.title} description={card.description} />
            ))}
        </div>
    );
};

export default CardList;