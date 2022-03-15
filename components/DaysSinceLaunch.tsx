const DaysSinceLaunch = function () {
  const date1 = new Date('9/6/2019');
  const date2 = new Date();

  // @ts-ignore
  const daysSinceLaunch = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
  return (
    <div className='flex justify-center flex-col rounded bg-teal-400 text-black p-2'>
      <h2 className='text-2xl'>
        Days since Galaxy Fold launch but, no iPhone Fold:
      </h2>
      <p className='text-center text-4xl'>{daysSinceLaunch}</p>
    </div>
  );
};

export default DaysSinceLaunch;
