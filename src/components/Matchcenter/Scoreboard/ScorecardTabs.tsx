import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const ScorecardTabs = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>{`s1Team.name`}</Tab>
        <Tab>{`s2Team.name`}</Tab>
      </TabList>
      <TabPanel>Panel 1</TabPanel>
      <TabPanel>Panel 2</TabPanel>
    </Tabs>
  );
};

export default ScorecardTabs;
