import React from "react";
import styles from "../styles/components/Loading/Loading.module.css";

const Loading = () => {
    return (
        <div className={styles["circle-wrapper"]}> 
            <div className={styles.circle}></div>
        </div>
    );
};

export default Loading;
