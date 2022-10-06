import axios from "axios";
import { store } from "../store/StateProvider";

// const URL_AUTH = "http://localhost:3000/snc-iw/b12/auth";
// const URL_API = "http://localhost:3000/snc-iw/b12/api";
// const URL_NODE_RED = "http://localhost:3000/snc-iw/b12/node-red";

const URL_AUTH = "/snc-iw/b12/auth";
const URL_API = "/snc-iw/b12/api";
const URL_NODE_RED = "/snc-iw/b12/node-red";

import { updateShelvesInfo } from "../store/slice/shelvesInfoSlice";
import { updateActionHistory } from "../store/slice/actionHistorySlice";
import { updateStocksInfo } from "../store/slice/stocksInfoSlice";
import { updateShelvesUsed } from "../store/slice/shelvesUsedSlice";
import { updateActionsCount } from "../store/slice/actionsCountSlice";
import { updatePLCData } from "../store/slice/plcDataSlice";

function getAxiosConfig() {
  const token = window.localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return config;
}

export async function fetchLogin(username, password) {
  try {
    const { data } = await axios.post(URL_AUTH + "/login", {
      username,
      password,
    });

    if (data.state) {
      window.localStorage.setItem("isLoggedIn", true);
      window.localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error) {
    console.error("[fetchLogin]", error);
  }
}

export function fetchLogout() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(true);
        delete window.localStorage.token;
        delete window.localStorage.isLoggedIn;

        store.dispatch(updateShelvesInfo([]));
        store.dispatch(updateActionHistory([]));
        store.dispatch(updateActionsCount([]));
        store.dispatch(updatePLCData([]));
      }, 0);
    } catch (error) {
      reject(error);
    }
  });
}

export async function fetchShelvesInfo() {
  if (!Boolean(window.localStorage.isLoggedIn)) return;
  try {
    const { data } = await axios.get(
      URL_API + "/shelves-info",
      getAxiosConfig()
    );
    store.dispatch(updateShelvesInfo(data));
  } catch (error) {
    console.error("[fetchShelvesInfo]", error);
  }
}

export async function fetchActionHistory() {
  if (!Boolean(window.localStorage.isLoggedIn)) return;
  try {
    const { data } = await axios.get(
      URL_API + "/action-history",
      getAxiosConfig()
    );
    store.dispatch(updateActionHistory(data));
  } catch (error) {
    console.error("[fetchActionHistory]", error);
  }
}

export async function fetchStocksInfo() {
  if (!Boolean(window.localStorage.isLoggedIn)) return;
  try {
    const { data } = await axios.get(
      URL_API + "/stocks-info",
      getAxiosConfig()
    );
    store.dispatch(updateStocksInfo(data));
  } catch (error) {
    console.error("[fetchStocksInfo]", error);
  }
}

export async function fetchShelvesUsed() {
  if (!Boolean(window.localStorage.isLoggedIn)) return;
  try {
    const { data } = await axios.get(
      URL_API + "/shelves-used",
      getAxiosConfig()
    );
    store.dispatch(updateShelvesUsed(data));
  } catch (error) {
    console.error("[fetchShelvesUsed]", error);
  }
}

export async function fetchActionsCount() {
  if (!Boolean(window.localStorage.isLoggedIn)) return;
  try {
    const { data } = await axios.get(
      URL_API + "/action-count",
      getAxiosConfig()
    );
    store.dispatch(updateActionsCount(data));
  } catch (error) {
    console.error("[fetchActionsCount]", error);
  }
}

export async function fetchImportShelf(reqData) {
  try {
    const { data } = await axios.post(
      URL_API + "/import-shelf",
      reqData,
      getAxiosConfig()
    );
    // console.log(data);
    await fetchShelvesInfo();
    await fetchStocksInfo();
    await fetchActionHistory();
    return data;
  } catch (error) {
    console.error("[fetchImportShelf]", error);
    return { state: false, msg: error };
  }
}

export async function fetchExportShelf(reqData) {
  try {
    const { data } = await axios.post(
      URL_API + "/export-shelf",
      reqData,
      getAxiosConfig()
    );
    // console.log(data);
    await fetchShelvesInfo();
    await fetchStocksInfo();
    await fetchActionHistory();
    return data;
  } catch (error) {
    console.error("[fetchExportShelf]", error);
    return { state: false, msg: error };
  }
}

export async function fetchMoveShelf(reqData) {
  try {
    const { data } = await axios.post(
      URL_API + "/move-shelf",
      reqData,
      getAxiosConfig()
    );
    // console.log(data);
    await fetchShelvesInfo();
    await fetchStocksInfo();
    await fetchActionHistory();
    return data;
  } catch (error) {
    console.error("[fetchMoveShelf]", error);
    return { state: false, msg: error };
  }
}

export async function fetchAddJobs(reqData) {
  try {
    const { data } = await axios.post(
      URL_NODE_RED + "/add-jobs",
      reqData,
      getAxiosConfig()
    );
    // console.log(data);
    await fetchShelvesInfo();
    await fetchStocksInfo();
    await fetchActionHistory();
    return data;
  } catch (error) {
    console.error("[fetchAddJobs]", error);
    return { state: false, msg: error };
  }
}

export async function fetchRestartNodeRED() {
  try {
    const { data } = await axios.post(
      URL_NODE_RED + "/restart-nodered",
      {},
      getAxiosConfig()
    );
    // console.log(data);
    return data;
  } catch (error) {
    console.error("[fetchRestartNodeRED]", error);
    return { state: false, msg: error };
  }
}

export async function fetchPLCCtrlButton(btnName) {
  try {
    const { data } = await axios.post(
      URL_NODE_RED + "/plc-control-button",
      { btnName },
      getAxiosConfig()
    );
    // console.log(data);
    return data;
  } catch (error) {
    console.error("[fetchPLCCtrlButton]", error);
    return { state: false, msg: error };
  }
}

export async function fetchPLCData() {
  if (!Boolean(window.localStorage.isLoggedIn)) return;
  try {
    const { data } = await axios.get(
      URL_NODE_RED + "/plc-data",
      getAxiosConfig()
    );
    store.dispatch(updatePLCData(data));
  } catch (error) {
    console.error("[fetchPLCData]", error);
  }
}

export async function fetchExpireToken() {
  if (!Boolean(window.localStorage.isLoggedIn)) return;
  try {
    const { data } = await axios.post(
      URL_AUTH + "/expire-token",
      {},
      getAxiosConfig()
    );
    return data;
  } catch (error) {
    console.error("[fetchExpireToken]", error);
    return { state: false, msg: error };
  }
}
