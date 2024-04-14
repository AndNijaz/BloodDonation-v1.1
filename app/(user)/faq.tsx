import { View, Text } from "@/components/Themed";
import { FlatList, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthProvider";
import { Redirect } from "expo-router";
import Accordion from "@/components/Accordion";

const faq = [
  {
    title: "ŠTETI LI DARIVANJE KRVI ZDRAVLJU?",
    description:
      "Darivanje krvi ne šteti zdravlju ako se provedu svi propisani postupci pri odabiru darivatelja krvi. Svaka zdrava osoba između 18 i 65 godina starosti može bez opasnosti za svoje zdravlje darovati krv, 3 do 4 puta tijekom jedne godine.",
  },
  {
    title: "MOŽE LI SE DARIVANJEM KRVI ZARAZITI OD NEKE BOLESTI?",
    description:
      "Tijekom darivanja krvi ne postoji mogućnost zaraze davriaoca. Sav pribor za uzimanje krvi - igle, plastične kese i ostali materijal koji se koristi pri uzimanju krvi su sterilni i za jednokratnu su upotrebu. Pribor je napravljen na način koji onemogućuje njegovu ponovnu upotrebu",
  },
  {
    title: "ZAŠTO SE ODMAH NAKON DARIVANJA KRVI NE SMIJE PUŠITI?",
    description:
      "Mnogi se pušači - darivatelji krvi ljute kada ih zamolimo da ne zapale cigaretu odmah nakon darivanja. Jedna od rjeđih, ali neugodnih reakcija organizma na pušenje je kratkotrajno stiskanje (spazam) krvnih žila u mozgu. Stoga, ako se puši odmah nakon završenog darivanja krvi, u nekih, posebno mlađih osoba, može doći do blage omaglice i mučnine. Postoji još čitav niz zdravstvenih i društvenih razloga koji pokazuju da ne bi trebalo pušiti, zar ne?",
  },
  {
    title: "RAZVIJA LI SE OVISNOST ZA DARIVANJE KRVI?",
    description:
      "Neki ljudi se ipak bolje osjećaju nakon što daruju krv i zato daruju krv nekoliko puta godišnje. Ta je pojava češća u osoba s blago povišenim krvnim tlakom. U tih je osoba darivanje krvi ujedno i način ublažavanja simptoma uzrokovanih blagim povišenjem krvnog tlaka, ali nije način liječenja povišenog tlaka.",
  },
  {
    title:
      "ZAŠTO NEKIM DARIVAOCIMA OTEKNE MJESTO UBODA IGLE KROZ KOJU JE UZETA KRV?",
    description:
      "Uzimanje krvi izvodi se ubodom sterilnom iglom u venu lakatne jame. Darivanje traje 8 do 12 minuta i kroz to vrijeme igla se nalazi u veni. Po završetku uzimanja krvi igla se vadi, a kožu se na mjestu uboda zaštićuje .  Da bi se ubrzalo zatvaranje otvora u veni, ispružena ruka se podiže u vis. U većini je slučajeva otvor u veni potpuno zatvoren u roku od par minuta i na koži ostaje samo mali trag uboda.",
  },
  {
    title: "ZAŠTO SE NEKI DARIVAOCI NE OSJEĆAJU DOBRO NAKON DARIVANJA KRVI?",
    description:
      "Većina zdravih osoba koje daruju krv podnosi gubitak 450 mL  krvi bez ikakvih nuspojava. Nuspojave su tijekom davrianja krvi rijetkost i opažaju se u oko 3 do 5% davanja krvi. Nuspojave se mogu pojaviti u toku darivanja, ali i do više  sati nakon darivanja krvi.",
  },
  {
    title: "KOLIKO ČESTO SE MOŽE DARIVATI KRV?",
    description:
      "Muškarci mogu darivati punu krv svaka 3 mjeseca, a žene svaka 4 mjeseca.",
  },
  {
    title: "MORA LI SE NAKON DARIVANJA KRVI NEŠTO POJESTI I POPITI?",
    description:
      "Posebni medicinski razlozi ne zabranjuju darivaocu da jede ili pije nakon davrianja krvi. To je oblik društvenog ponašanja.",
  },
];

export default function Faq() {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href="/" />;
  }
  return (
    <FlatList
      style={styles.container}
      data={faq}
      renderItem={({ item }) => (
        <Accordion title={item.title} content={item.description} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    // paddingTop: 32,
  },
});
