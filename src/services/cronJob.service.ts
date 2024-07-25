import { CronJob } from 'cron';

export class CronJobService {
    private job: CronJob;

    constructor(private cronTime: string, private onTick: () => Promise<void>) {
        this.job = new CronJob(this.cronTime, this.onTick);
    }

    startCronJob() {
        this.job.start();
        console.log('Cron job started');
    }
}
