import Axios from "axios";
import {
  SCREEN_CALENDAR_REQUEST,
  SCREEN_CALENDAR_SUCCESS,
  SCREEN_CALENDAR_FAIL,
  ADD_CALENDAR_DATA_REQUEST,
  ADD_CALENDAR_DATA_SUCCESS,
  ADD_CALENDAR_DATA_FAIL,
  BOOK_DAY_SLOT_REQUEST,
  BOOK_DAY_SLOT_SUCCESS,
  BOOK_DAY_SLOT_FAIL,
  BOOK_SLOT_REQUEST,
  BOOK_SLOT_SUCCESS,
  BOOK_SLOT_FAIL,
  BOOK_DAY_REQUEST,
  BOOK_DAY_SUCCESS,
  BOOK_DAY_FAIL,
} from "../Constants/calendarConstants";

// get calender details

export const getScreenCalender = (screenId) => async (dispatch, getState) => {
  dispatch({
    type: SCREEN_CALENDAR_REQUEST,
    payload: screenId,
  });

  const {
    userSignin: { userInfo },
  } = getState();
  // const {screenDetails: {screen}} = getState();

  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/calender/screen/${screenId}/slots`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({
      type: SCREEN_CALENDAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: SCREEN_CALENDAR_FAIL,
      payload: message,
    });
  }
};

// get asked slot details

export const addCalenderData =
  (screenId, calender) => async (dispatch, getState) => {
    dispatch({
      type: ADD_CALENDAR_DATA_REQUEST,
      payload: calender,
    });

    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.put(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/calender/screen/${screenId}`,
        calender,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: ADD_CALENDAR_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: ADD_CALENDAR_DATA_FAIL,
        payload: message,
      });
    }
  };

//

export const bookDaySlot =
  (screenId, daySlotToBook) => async (dispatch, getState) => {
    dispatch({
      type: BOOK_DAY_SLOT_REQUEST,
      payload: screenId,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/calender/screen/${screenId}/day`,
        { daySlotToBook },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({
        type: BOOK_DAY_SLOT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: BOOK_DAY_SLOT_FAIL,
        payload: message,
      });
    }
  };

// book calender slot
export const bookSlot =
  (screenId, slotId, slotToBook) => async (dispatch, getState) => {
    dispatch({
      type: BOOK_SLOT_REQUEST,
      payload: slotToBook,
    });

    const {
      userSignin: { userInfo },
    } = getState();

    try {
      const { data } = await Axios.put(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/calender/screen/${screenId}/slot/${slotId}/booking`,
        slotToBook,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: BOOK_SLOT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: BOOK_SLOT_FAIL,
        payload: message,
      });
    }
  };

// book calender day
export const bookDay =
  (screenId, dayId, dayToBook) => async (dispatch, getState) => {
    dispatch({
      type: BOOK_DAY_REQUEST,
      payload: dayToBook,
    });

    const {
      userSignin: { userInfo },
    } = getState();

    try {
      const { data } = await Axios.put(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/calender/screen/${screenId}/day/${dayId}/booking`,
        dayToBook,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: BOOK_DAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: BOOK_DAY_FAIL,
        payload: message,
      });
    }
  };
