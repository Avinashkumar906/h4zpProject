import CountUp from 'react-countup';

const Statistics = () => {
  const stats = [
    { label: 'Children Educated', value: 5000 },
    { label: 'Villages with Clean Water', value: 12 },
    { label: 'Meals Served', value: 25000 },
  ];

  return (
    <section className="py-4 bg-light text-center">
      <div className="container">
        <h3 className="mb-4">Our Impact</h3>
        <div className="row justify-content-center">
          {stats.map((item, index) => (
            <div key={index} className="col-6 col-sm-4 mb-3">
              <h4 className="mb-1">
                <CountUp
                  end={item.value}
                  duration={2}
                  separator=","
                  enableScrollSpy
                  scrollSpyOnce
                />
                +
              </h4>
              <p className="text-muted mb-0 small">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
