import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IProject } from '../models/IProject';
import { Observable } from 'rxjs';
import { IEducation } from '../models/IEducation';
import { IJob } from '../models/IJob';
import { IUser } from '../models/IUser';
import { ISkill } from '../models/ISkills';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getUserDetail(): Observable<IUser> {
    return this.http.get<IUser>(`${environment.apiUrl}/api/user/`);
  }

  getProjects(): Observable<IProject[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/project/`);
  }
  getProjectDetail(project_id: number): Observable<IProject> {
    return this.http.get<IProject>(
      `${environment.apiUrl}/api/project/${project_id}`
    );
  }
  getEducation(): Observable<IEducation[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/education/`);
  }
  getEducationDetail(education_id: number): Observable<IEducation> {
    return this.http.get<IEducation>(
      `${environment.apiUrl}/api/education/${education_id}`
    );
  }
  getWorkExperience(): Observable<IJob[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/job/`);
  }
  getWorkExperienceDetail(job_id: number): Observable<IJob> {
    return this.http.get<any>(`${environment.apiUrl}/api/job/${job_id}`);
  }
  getSkills(): Observable<ISkill> {
    return this.http.get<any>(`${environment.apiUrl}/api/skill/`);
  }


  updateProjectDetail(data: IProject) {
    return this.http.patch<IProject>(
      `${environment.apiUrl}/api/project/`,
      data
    );
  }
  updateEducationDetail(education_data: IEducation) {
    return this.http.patch<IEducation>(
      `${environment.apiUrl}/api/education/`,
      education_data
    );
  }
  updateJobDetail(job_data: IEducation) {
    return this.http.patch<IEducation>(
      `${environment.apiUrl}/api/job/`,
      job_data
    );
  }
  createProject(project_data: IProject) {
    return this.http.post<IProject>(
      `${environment.apiUrl}/api/project/`,
      project_data,
      httpOptions
    );
  }
  createEducation(education_data: IEducation) {
    return this.http.post<IEducation>(
      `${environment.apiUrl}/api/education/`,
      education_data,
      httpOptions
    );
  }
  createJob(job_data: IJob) {
    return this.http.post<IJob>(
      `${environment.apiUrl}/api/job/`,
      job_data,
      httpOptions
    );
  }
  addSkills(skill_data: string): Observable<ISkill> {
    return this.http.post<any>(
      `${environment.apiUrl}/api/skill/`,
      skill_data,
      httpOptions
    );
  }
}
