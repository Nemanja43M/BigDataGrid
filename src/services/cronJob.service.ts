import { CronJob } from 'cron';
import logger from './logger.service';

export class CronJobService {
    private job: CronJob;

    constructor(private cronTime: string, private onTick: () => Promise<void>) {
        this.job = new CronJob(this.cronTime, this.onTick);
    }

    startCronJob() {
        this.job.start();
        logger.info('Cron job started', {
            metadata: { cronTime: this.cronTime },
        });
    }
}
