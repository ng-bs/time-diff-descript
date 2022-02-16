# time-diff-descript

TS/JS library to get a time differential description. Based upon the logic created by github [here](https://github.com/github/time-elements). That library exposes HTML elements for use displaying formatted differntials (i.e. "2 days ago", "in 5 hours"), without programatic access to that logic. This library uses the same logic but exposes it for programatic consumption.

```ts
import { getTimeDiff } from '@ng-bs/time-diff-descript';

getTimeDiff(new Date());
// will return: "now"

const now = new Date();
const tomorrow = now.setDate(now.getDate() + 1);
getTimeDiff(tomorrow);
// will return: "tomorrow"

const now = new Date();
const twoDaysFromNow = now.setDate(now.getDate() + 2);
getTimeDiff(twoDaysFromNow);
// will return: "in 2 days"
```

## Next Steps

Create Angular libarary
expose time-diff-descript as a service
expose the service logic via a pipe
