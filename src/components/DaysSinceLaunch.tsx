const DaysSinceLaunch = function () {
  const date1 = new Date('9/6/2019');
  const date2 = new Date();

  // @ts-ignore
  const daysSinceLaunch = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
  return (
    <div className='flex flex-col justify-center rounded bg-teal-400 p-2 text-black'>
      <h2 className='text-2xl'>
        Days since Galaxy Fold launch but, no iPhone Fold:
      </h2>
      <p className='text-center font-mono text-4xl font-bold'>
        {daysSinceLaunch}
      </p>
    </div>
  );
};

export default DaysSinceLaunch;
