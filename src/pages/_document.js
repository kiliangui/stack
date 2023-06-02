import { Header } from '@/components/header'
import { Html, Head, Main, NextScript } from 'next/document'
import {useEffect, useState} from "react";
import {pb} from "@/lib/pocketbase";

export default function Document() {

  return (
    <Html lang="fr">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}