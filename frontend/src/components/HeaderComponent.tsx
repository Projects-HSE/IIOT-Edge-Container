import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInterval } from '../hooks/useInterval';
import { ErrorlogResponse } from '../models/errorlog-response.model';
import { getAllErrors } from '../services/errorlog.service';

const test = [
    {
        _id: {
            $oid: 'test1',
        },
        errormsg: 'testError',
        id: 1,
        machine: 'test',
    },
    {
        _id: {
            $oid: 'test2',
        },
        errormsg: 'testError',
        id: 1,
        machine: 'test',
    },
];

export const HeaderComponent = () => {
    const [allErrors, setallErrors] = useState<ErrorlogResponse[]>(test);
    const [wwhStatus, setWwhStatus] = useState<boolean>(true);

    useEffect(() => {
        void getAllErrors().then((allErrors) => setallErrors(allErrors));
    }, []);

    useInterval(async () => {
        const data = await getAllErrors();
        setallErrors(data);
        if (data.find((element) => element.id === 41)) {
            setWwhStatus(false);
        }
    }, 10000);
    return (
        <div className="flex justify-between items-center w-11/12 mx-auto my-3 rounded-xl drop-shadow-xl shadow-md shadow-grey h-20 bg-slate-200">
            <div className="w-auto h-auto m-5">
                <span className="font-bold text-4xl italic text-slate-400 drop-shadow-2xl">
                    <Link to="/">
                        <span className="hover:text-slate-500">IRF 1000</span>
                    </Link>
                </span>
            </div>
            <div className="flex justify-around items-center">
                <Link to="/ErrorlogUser">
                    <div>
                        {allErrors.length ? (
                            <div className="mr-8 positon relative flex justify-start">
                                <div className="flex justify-center items-center bg-black fill-yellow-400 drop-shadow-2xl w-2 h-5 position relative">
                                    <svg
                                        className="position absolute w-8 hover:fill-slate-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32z" />
                                    </svg>
                                </div>
                                <div className="bg-yellow-400 position absolute left-4 bottom-4 flex justify-center item-center top- text-xs w-4 h-4 rounded-full">
                                    {allErrors.length}
                                </div>
                            </div>
                        ) : (
                            <div className="m-5 flex justify-center items-center fill-slate-400 drop-shadow-2xl w-8 h-8">
                                <svg
                                    className="hover:text-slate-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32z" />
                                </svg>
                            </div>
                        )}
                    </div>
                </Link>

                <Link to="/Login">
                    <div className="flex justify-center items-center fill-slate-400 drop-shadow-2xl w-8 h-8">
                        <svg
                            className="hover:fill-slate-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z" />
                        </svg>
                    </div>
                </Link>

                <div
                    className={
                        wwhStatus
                            ? 'flex justify-center items-center bg-ColorStatusConnectionOnline w-16 h-16 m-5 rounded-3xl'
                            : 'flex justify-center items-center bg-ColorStatusConnectionOffline w-16 h-16 m-5 rounded-3xl'
                    }
                >
                    <svg
                        className="fill-white w-8 h-8"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 21 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};
