import { Fragment } from 'react';
import React from 'react';

const Loader1: React.FC = () => {
  const [dots, setDots] = React.useState([
    {
      id: 1,
      x: 0,
      y: 50,
      direction: 'up',
    },
    {
      id: 2,
      x: 10,
      y: 50,
      direction: 'down',
    },
    {
      id: 3,
      x: 20,
      y: 50,
      direction: 'up',
    },
    {
      id: 4,
      x: 30,
      y: 50,
      direction: 'down',
    },

    {
      id: 5,
      x: 40,
      y: 50,
      direction: 'up',
    },
    {
      id: 6,
      x: 50,
      y: 50,
      direction: 'down',
    },
    {
      id: 7,
      x: 60,
      y: 50,
      direction: 'up',
    },
    {
      id: 8,
      x: 70,
      y: 50,
      direction: 'down',
    },
    {
      id: 9,
      x: 80,
      y: 50,
      direction: 'up',
    },

    {
      id: 10,
      x: 90,
      y: 50,
      direction: 'down',
    },
  ]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const updatedDots = dots.map((dot) => {
        if (dot.direction === 'up') {
          dot.y -= 1;
          if (dot.y <= 40) {
            dot.direction = 'down';
          }
        } else {
          dot.y += 1;
          if (dot.y >= 60) {
            dot.direction = 'up';
          }
        }
        return dot;
      });

      setDots(updatedDots);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [dots]);

  return (
    <Fragment>
      <div className="flex items-center justify-center">
        {dots.map((dot) => (
          <div
            key={dot.id}
            className="w-4 h-4 bg-green-200 rounded absolute"
            style={{ top: `${dot.y}%`, left: `${dot.x}%` }}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default Loader1;
