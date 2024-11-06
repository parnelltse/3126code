import Button from "../atoms/button";
import styles from "@/app/header.module.css";
import Image from "next/image";

export default function Header({
  heading,
  onFetchPicture,
  onRemovePicture,
  picturesDisplayed,
}) {
  return (
    <div className={styles.headerWrapper}>
      <Image
        src="/images/neko.jpg"
        alt="Neko Image"
        width={300}
        height={200}
        priority
        className={styles.nekoImage}
      />
      <div className={styles.anotherContainer}>
        <h1 className={styles.header}>{heading}</h1>
        <p>Click the button below to see the best nekos 😽 !</p>
        <Button
          className={styles.button}
          onClick={picturesDisplayed ? onRemovePicture : onFetchPicture}
        >
          {picturesDisplayed ? "Remove Picture ❌" : "Nekos 😽"}
        </Button>
      </div>
    </div>
  );
}
