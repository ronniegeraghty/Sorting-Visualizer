import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Visualizer from "./components/Visualizer";
import Footer from "./components/Footer";
import Sound from "./components/Sound";
import arrayCreator from "./functions/arrayCreator";
import switchSortType from "./functions/switchSortType";
import checkSort from "./functions/checkSort";
import calcTimeInterval from "./functions/calcTimeInterval";
import getFrequencies from "./functions/getFrequencies";
import "./App.css";

const App = () => {
  const [sortState, setSortState] = useState({
    ...switchSortType("bubble"),
    array: arrayCreator(20),
  });
  // let sortSpeed = 100;
  const [sortSpeed, setSortSpeed] = useState(100);

  /**
   * Create a randomly shuffeled array and put it in the sortState
   * @param {int} arrLen
   */
  function createRandomArray(arrLen) {
    setSortState(prevState => ({
      ...switchSortType(prevState.type),
      array: arrayCreator(arrLen),
    }));
  }

  /**
   * Changes the sort type in the sortState
   * @param {string} sortType
   */
  function setSortType(sortType) {
    setSortState(prevState => ({
      ...prevState,
      ...switchSortType(sortType),
    }));
  }

  /**
   * Changes the sort speed
   * @param {int} sortSpeed
   */
  function setSpeed(speed) {
    setSortSpeed(speed);
  }

  /**
   * Change the sortState.status based on current status when sort button is pressed.
   * @param {string} sortType
   */
  function sortButton() {
    if (sortState.status === "active") {
      setSortState(prevState => ({
        ...prevState,
        status: "paused",
      }));
    } else if (sortState.status === "paused") {
      setSortState(prevState => ({
        ...prevState,
        status: "active",
      }));
    } else if (sortState.status === "inactive") {
      setSortState(prevState => ({
        ...prevState,
        ...switchSortType(prevState.type),
        status: "active",
      }));
    }
  }

  // Acts as the sort loop based on sortState.statuse
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (sortState.status === "active") {
        setSortState(prevState => ({
          ...prevState,
          ...prevState.sort(prevState),
        }));
      } else if (sortState.status === "finished") {
        setSortState(prevState => ({
          ...prevState,
          ...checkSort(prevState),
        }));
      } else if (sortState.status === "checked") {
        setSortState(prevState => ({
          ...switchSortType(prevState.type),
          array: prevState.array,
          traversals: prevState.traversals,
          comparisons: prevState.comparisons,
        }));
      }
    }, calcTimeInterval(sortSpeed));
    return () => clearTimeout(timeout);
  }, [sortState, sortSpeed]);
  return (
    <div className="App">
      <NavBar
        radArrCB={createRandomArray}
        sortTypeCB={setSortType}
        sortButtonCB={sortButton}
        sortStatus={sortState.status}
      />
      <Sound time={1000} soundFreqs={getFrequencies(sortState)} />
      <Visualizer
        array={sortState.array}
        currentIndexes={sortState.currentIndexes}
        traversals={sortState.traversals}
        comparisons={sortState.comparisons}
        sortSpeedCB={setSpeed}
      />
      <Footer />
    </div>
  );
};

export default App;
